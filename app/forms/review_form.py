from flask import Flask
from flask_wtf import FlaskForm
from wtforms import TextAreaField
from wtforms.validators import InputRequired, Length


class ReviewForm(FlaskForm):
    content = TextAreaField("Review", validators=[
        InputRequired(message='⚠️ Please provide a review'),
        Length(min=4, max=20480, message="⚠️ The number of characters must be between 4 and 20,480 characters in length")])
