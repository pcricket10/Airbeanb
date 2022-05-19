from app.models import db, User


# Adds a demo user, you can add other users here if you want
def seed_users():
    demo = User(
        username='Demo', first_name='Demo', last_name="User", email='demo@aa.io',  password='password')
    bigbird = User(
        username='Bigbird', first_name='Big', last_name='Bird', email='bigbird@aa.io',  password='password')
    psherman = User(
        username='Psherman', first_name='P.', last_name='Sherman', email='psherman@aa.io',  password='password')

    db.session.add(demo)
    db.session.add(bigbird)
    db.session.add(psherman)

    db.session.commit()


# Uses a raw SQL query to TRUNCATE the users table.
# SQLAlchemy doesn't have a built in function to do this
# TRUNCATE Removes all the data from the table, and RESET IDENTITY
# resets the auto incrementing primary key, CASCADE deletes any
# dependent entities
def undo_users():
    db.session.execute('TRUNCATE users RESTART IDENTITY CASCADE;')
    db.session.commit()
