from sqlalchemy import create_engine
from sqlalchemy.orm import Session


DATABASE_URL = "postgresql+psycopg://ibrahimthanbir@localhost:5432/finance_tracker"

engine = create_engine(DATABASE_URL)


def get_db():
    with Session(engine) as session:
        yield session