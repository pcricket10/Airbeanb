from flask import Flask
from flask_wtf import FlaskForm
from wtforms import TextAreaField, StringField, IntegerField
from wtforms.validators import DataRequired, URL


class ReviewForm(FlaskForm):
    content = TextAreaField("Review", validators=[
                         DataRequired(message='⚠️ Please provide a review')])
