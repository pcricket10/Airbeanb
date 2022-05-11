from app.models import db, User
from datetime import datetime


# Adds a demo user, you can add other users here if you want
def seed_users():
    demo = User(
        username='Demo', first_name='Demo', last_name="User", email='demo@aa.io', password='password', created_at=datetime.now(), updated_at=datetime.now())
    luke = User(
        username='Luke', first_name='Luke', last_name='Skywalker', email='luke@aa.io', password='password', created_at=datetime.now(), updated_at=datetime.now())
    leia = User(
        username='Leia', first_name='Leia', last_name='Organa', email='leia@aa.io', password='password', created_at=datetime.now(), updated_at=datetime.now())

    db.session.add(demo)
    db.session.add(luke)
    db.session.add(leia)

    db.session.commit()


# Uses a raw SQL query to TRUNCATE the users table.
# SQLAlchemy doesn't have a built in function to do this
# TRUNCATE Removes all the data from the table, and RESET IDENTITY
# resets the auto incrementing primary key, CASCADE deletes any
# dependent entities
def undo_users():
    db.session.execute('TRUNCATE users RESTART IDENTITY CASCADE;')
    db.session.commit()
