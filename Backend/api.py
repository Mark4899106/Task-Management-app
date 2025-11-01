from flask import Flask, jsonify, request
from flask_cors import CORS
import sqlite3
from flask_jwt_extended import (
    JWTManager, create_access_token,
    jwt_required, get_jwt_identity
)
import hashlib
 
# Create a Flask app
app = Flask(__name__)
# Secret key for JWT (keep safe in env var in real apps)
 
app.config["JWT_SECRET_KEY"] = "super-secret-key"
 
jwt = JWTManager(app)
 
CORS(app, resources={r"/*": {"origins": "*"}})
 
DB_NAME = 'task.db'
 
# Helper function to get DB connection
def get_db_connection():
    conn = sqlite3.connect(DB_NAME)
    conn.row_factory = sqlite3.Row  # To get column names  
    return conn
 
# ---------- SIGNUP ----------
@app.route('/signup', methods=['POST'])
def signup():
    data = request.get_json()
    username = data.get("username")
    password = data.get("password")
 
    if not username or not password:
        return jsonify({"msg": "Username and password required"}), 400
 
    hashed_pw = hashlib.sha256(password.encode()).hexdigest()
 
    conn = get_db_connection()
 
    # Check if user exists
    existing_user = conn.execute(
        "SELECT * FROM users WHERE username=?", (username,)
    ).fetchone()
 
    if existing_user:
        # Update password
        conn.execute(
            "UPDATE users SET password=? WHERE username=?",
            (hashed_pw, username)
        )
        conn.commit()
        conn.close()
        return jsonify({"msg": "User updated successfully"}), 200
    else:
        # Insert new user
        conn.execute(
            "INSERT INTO users (username, password) VALUES (?, ?)",
            (username, hashed_pw)
        )
        conn.commit()
        conn.close()
        return jsonify({"msg": "User created successfully"}), 201
 
# ---------------- AUTH ----------------
@app.route('/login', methods=['POST'])
def login():
    data = request.get_json()
    username = data.get("username", None)
    password = data.get("password", None)
    conn = get_db_connection()
    user = conn.execute(
        "SELECT * FROM users WHERE TRIM(username)=? AND TRIM(password)=?",
        (username.strip(), password.strip())
    ).fetchone()
    conn.close()
 
    if user:
        # Create JWT token
        token = create_access_token(identity=username)
        return jsonify(access_token=token), 200
    else:
        return jsonify({"msg": "Bad username or password"}), 401
 
@app.route('/tasks/<int:task_id>', methods=['DELETE'])
def delete_task(task_id):
    conn = get_db_connection()
    cursor = conn.cursor()
 
    # Check if the task exists
    cursor.execute('SELECT * FROM tasks WHERE id = ?', (task_id,))
    task = cursor.fetchone()
    if task is None:
        conn.close()
        return jsonify({"error": "Task not found"}), 404
 
    # Delete the task
    cursor.execute('DELETE FROM tasks WHERE id = ?', (task_id,))
    conn.commit()
    conn.close()
 
    return jsonify({"message": f"Task {task_id} deleted successfully"}), 200
 
 
@app.route('/tasks/<int:task_id>', methods=['GET'])
def get_task(task_id):
    conn = get_db_connection()
    task = conn.execute('SELECT id, title, status FROM tasks WHERE id = ?', (task_id,)).fetchone()
    conn.close()
    if task is None:
        return jsonify({"error": "Task not found"}), 404
    return jsonify(dict(task))
 
@app.route('/tasks', methods=['GET'])
#@jwt_required()  # Require JWT token
def get_tasks():
    conn = get_db_connection()
    tasks = conn.execute('SELECT id, title, status FROM tasks').fetchall()
    conn.close()
   
    tasks_list = [dict(task) for task in tasks]
    return jsonify(tasks_list)
 
 
 
# @app.route('/tasks/<int:task_id>', methods=['PUT'])
#def update_task(task_id):
    #data = request.get_json()
    #title = data.get('title')
    #status = data.get('status')
 
 
    #if status not in ["pending", "in_progress", "completed"]:
     #   return jsonify({"error": "Invalid status"}), 400
 
@app.route('/tasks/<int:task_id>', methods=['PUT'])
def update_task(task_id):
    data = request.get_json()
    title = data.get('title')
    status = data.get('status')
 
    if not title:
        return jsonify({"error": "Title is required"}), 400
 
    if status not in ["pending", "in_progress", "completed"]:
        return jsonify({"error": "Invalid status"}), 400
 
    conn = get_db_connection()
    cursor = conn.cursor()
 
    # Check if the task exists
    task = cursor.execute('SELECT * FROM tasks WHERE id = ?', (task_id,)).fetchone()
    if task is None:
        conn.close()
        return jsonify({"error": "Task not found"}), 404
 
    # Update the task
    cursor.execute(
        'UPDATE tasks SET title = ?, status = ? WHERE id = ?',
        (title, status, task_id)
    )
    conn.commit()
    conn.close()
 
    return jsonify({"message": "Task updated successfully"}), 200
 
 
 
 
 
@app.route('/hello', methods=['GET'])
def helloWorld():
    return jsonify({"output":"Hello, World!"})
 
@app.route('/bye', methods=['GET'])
def GoodBye():
    return jsonify({"output":"Goodbye, World!"})
 
 
@app.route('/tasks', methods=['POST'])
def add_task():
    data = request.get_json()
    title = data.get('title')
    if not title:
        return jsonify({"error": "Title is required"}), 400
 
    conn = get_db_connection()
    cursor = conn.cursor()
    cursor.execute('INSERT INTO tasks (title, status) VALUES (?, ?)', (title, "pending"))
    conn.commit()
    task_id = cursor.lastrowid
    conn.close()
 
    return jsonify({"id": task_id, "title": title}), 201
 
if __name__ == '__main__':
    app.run(debug=True)
     
     
 
 