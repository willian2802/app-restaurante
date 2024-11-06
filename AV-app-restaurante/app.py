from flask import Flask, render_template, request, jsonify, session
from flask_socketio import SocketIO

app = Flask(__name__)
app.config['SECRET_KEY'] = 'secret!'
socketio = SocketIO(app)

@app.route('/')
def index():
    return render_template('main-page.html')


if __name__ == '__main__':
    app.run(debug=True)