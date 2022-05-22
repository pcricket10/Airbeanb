from flask import Flask
from flask_wtf import FlaskForm
from wtforms import StringField, FloatField
from wtforms.validators import InputRequired, DataRequired, URL, Length

# def check_length(length, max):


class PostForm(FlaskForm):
    product_name = StringField("product_name", validators=[
        InputRequired(message='⚠️ Please enter a product name'),
        Length(max=50, message="⚠️ The number of characters must be less than 50 characters in length")])
    price = FloatField("price", validators=[DataRequired(
        message="⚠️ Please enter a valid amount")])
    img_url = StringField("img_url", validators=[
        InputRequired(message='⚠️ Please enter an image url'), URL(
            message="⚠️ this must be a valid URL"),
        Length(max=255, message="⚠️ The number of characters must be less than 255 characters in length")])

    location = StringField("⚠️ location", validators=[
        InputRequired(message="⚠️ Please enter a location"),
        Length(max=255, message="⚠️ The number of characters must be less than 255 characters in length")])
