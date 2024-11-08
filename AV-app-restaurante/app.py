from flask import Flask, render_template, request, jsonify, session
from flask_socketio import SocketIO

app = Flask(__name__)
app.config['SECRET_KEY'] = 'secret!'
socketio = SocketIO(app)

@app.route('/')
def acess_main_page():
    return render_template('main-page.html')

@app.route('/admin')
def acess_login_page():
    return render_template('admin.html')


#  Login and Register
@app.route('/admin-page-process', methods=['POST'])
def login():
    action = request.form['action']
    username = request.form['username']
    password = request.form['password']
    return jsonify({'message': f'Login bem-sucedido! Seja bem-vindo, {username}.'})



if __name__ == '__main__':
    app.run(debug=True)