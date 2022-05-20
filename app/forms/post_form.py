from flask import Flask
from flask_wtf import FlaskForm
from wtforms import StringField, FloatField
from wtforms.validators import DataRequired, URL


class PostForm(FlaskForm):
    product_name = StringField("product_name", validators=[
        DataRequired(message='⚠️ Please enter a product name')])
    price = FloatField("price", validators=[DataRequired(
        message="⚠️ Please enter a valid amount")])
    img_url = StringField("img_url", validators=[
        DataRequired(message='⚠️ Please enter an image url'), URL(message="⚠️ this must be a valid URL")])
    location = StringField("⚠️ location", validators=[
                           DataRequired(message="⚠️ Please enter a location")])
