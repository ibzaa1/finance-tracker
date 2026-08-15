# IMPORTS 
from datetime import datetime
from decimal import Decimal
from enum import Enum

from pydantic import BaseModel, Field

from fastapi import FastAPI, Depends, HTTPException

from sqlalchemy.orm import Session
from sqlalchemy import select, func

from app.database import get_db
from app.models import TransactionDB

# ENUM VALUES 
class TransactionType(str, Enum):
    INCOME = "income"
    EXPENSE = "expense"

# TRANSACTION DATA MODEL
class Transaction(BaseModel):
    id: int
    amount: Decimal
    description: str | None = None
    category: str
    transaction_type: TransactionType
    created_at: datetime

    model_config = {
        "from_attributes": True
    }

# CREATE TRANSACTION DATA MODEL
class TransactionCreate(BaseModel):
    amount: Decimal = Field(gt=0)
    description: str | None = None
    category: str
    transaction_type: TransactionType
    created_at: datetime

# UPDATE TRANSACTION DATA MODEL
class TransactionUpdate(BaseModel):
    amount: Decimal | None = Field(default=None, gt=0)
    description: str | None = None
    category: str | None = None
    transaction_type: TransactionType | None = None
    created_at: datetime | None = None

# TRANSACTION SUMMARY DATA MODEL
class TransactionSummary(BaseModel):
    total_income: Decimal
    total_expenses: Decimal
    net_balance: Decimal


# INITIALISE FASTAPI APP
app = FastAPI()

# CHECK IF API IS RUNNING
@app.get("/")
def root():
    return {"message": "Finance Tracker API is running!"}

# CREATE AND SAVE TRANSACTION ENDPOINT
@app.post("/transactions", response_model=Transaction)
def create_transaction(
    transaction: TransactionCreate,
    db: Session = Depends(get_db)
):
    db_transaction = TransactionDB(
        amount=transaction.amount,
        description=transaction.description,
        category=transaction.category,
        transaction_type=transaction.transaction_type,
        created_at=transaction.created_at
    )

    db.add(db_transaction)
    db.commit()
    db.refresh(db_transaction)

    return db_transaction


# DELETE TRANSACTION BY ID ENDPOINT
@app.delete("/transactions/{transaction_id}", status_code=204)
def delete_transaction(
    transaction_id: int,
    db: Session = Depends(get_db)
):
    statement = select(TransactionDB).where(
        TransactionDB.id == transaction_id
    )

    result = db.execute(statement)
    transaction = result.scalar_one_or_none()

    if transaction is None:
        raise HTTPException(
            status_code=404,
            detail="Transaction not found"
        )

    db.delete(transaction)
    db.commit() 

# UPDATE TRANSACTION BY ID ENDPOINT
@app.put("/transactions/{transaction_id}", response_model=Transaction)
def update_transaction(
    transaction_id: int,
    transaction_update: TransactionUpdate,
    db: Session = Depends(get_db)
):
    statement = select(TransactionDB).where(
        TransactionDB.id == transaction_id
    )

    result = db.execute(statement)
    transaction = result.scalar_one_or_none()

    if transaction is None:
        raise HTTPException(
            status_code=404,
            detail="Transaction not found"
        )

    updates = transaction_update.model_dump(exclude_unset=True)

    for field, value in updates.items():
        setattr(transaction, field, value)

    db.commit()
    db.refresh(transaction)

    return transaction

@app.get("/transactions", response_model=list[Transaction])
def get_transactions(db: Session = Depends(get_db)):
    statement = select(TransactionDB)
    result = db.execute(statement)

    transactions = result.scalars().all()

    return transactions

# TRANSACTION SUMMARY ENDPOINT
@app.get("/transactions/summary", response_model=TransactionSummary)
def get_transaction_summary(
    db: Session = Depends(get_db)
):
    income_statement = select(
        func.sum(TransactionDB.amount)
    ).where(
        TransactionDB.transaction_type == "income"
    )

    result = db.execute(income_statement)
    total_income = result.scalar_one_or_none()

    if total_income is None:
        total_income = Decimal("0.00")

    expense_statement = select(
        func.sum(TransactionDB.amount)
    ).where(
        TransactionDB.transaction_type == "expense"
    )

    result = db.execute(expense_statement)
    total_expenses = result.scalar_one_or_none()

    if total_expenses is None:
        total_expenses = Decimal("0.00")

    net_balance = total_income - total_expenses

    return TransactionSummary(
        total_income=total_income,
        total_expenses=total_expenses,
        net_balance=net_balance
    )

# GET TRANSACTION BY ID ENDPOINT
@app.get("/transactions/{transaction_id}", response_model=Transaction)
def get_transaction(
    transaction_id: int,
    db: Session = Depends(get_db)
):
    statement = select(TransactionDB).where(
        TransactionDB.id == transaction_id
    )

    result = db.execute(statement)
    transaction = result.scalar_one_or_none()

    if transaction is None:
        raise HTTPException(
            status_code=404,
            detail="Transaction not found"
        )

    return transaction