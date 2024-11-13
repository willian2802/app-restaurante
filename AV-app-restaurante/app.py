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
@app.route('/login_register_staf', methods=['POST'])
def login():
    
    data = request.get_json()
    action = data['action']
    restaurante_name = data["restaurante_name"]
    username = data['username']
    password = data['password']

    # limpa os dados de sessão
    # session['user_id'] = ""
    # session['authentication'] = ""

    if data is None:
        print("data is null")

    return jsonify({'message': f'Login bem-sucedido! Seja bem-vindo, {username}.'})



if __name__ == '__main__':
    app.run(debug=True)