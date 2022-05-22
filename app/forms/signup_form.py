from flask_wtf import FlaskForm
from wtforms import StringField
from wtforms.validators import InputRequired, InputRequired, Email, ValidationError, Length
from app.models import User


def user_exists(form, field):
    # Checking if user exists
    email = field.data
    user = User.query.filter(User.email == email).first()
    if user:
        raise ValidationError('Email address is already in use.')


def username_exists(form, field):
    # Checking if username is already in use
    username = field.data
    user = User.query.filter(User.username == username).first()
    if user:
        raise ValidationError('Username is already in use.')


class SignUpForm(FlaskForm):
    username = StringField(
        'username', validators=[InputRequired(message="⚠️ Please provide a user name"), Length(min=4, max=40, message="Username must be between 4 and 40 characters in length"), username_exists])
    first_name = StringField('first_name', validators=[
                             InputRequired(message="⚠️ Please provide a first name")])
    last_name = StringField('last_name', validators=[
                            InputRequired(message="⚠️ Please provide a last name")])
    email = StringField('email', validators=[InputRequired(
        "⚠️ Please provide an email address"), Email(message='⚠️ Please provide a valid email address'), user_exists])
    password = StringField('password', validators=[InputRequired()])
