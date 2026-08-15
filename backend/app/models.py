# PYTHON IMPORTS 
from datetime import datetime
from decimal import Decimal

# SQLALCHEMY IMPORTS
from sqlalchemy import Numeric, Integer, String, DateTime
from sqlalchemy.orm import DeclarativeBase, Mapped, mapped_column


class Base(DeclarativeBase):
    pass


# TRANSACTION DATABASE MODEL
class TransactionDB(Base):
    __tablename__ = "transactions"

    id: Mapped[int] = mapped_column(Integer, primary_key=True)
    amount: Mapped[Decimal] = mapped_column(
        Numeric(10, 2),
        nullable=False
    )
    description: Mapped[str | None] = mapped_column(
        String(255),
        nullable=True
    )
    category: Mapped[str] = mapped_column(
        String(50),
        nullable=False
    )
    transaction_type: Mapped[str] = mapped_column(
        String(10),
        nullable=False
    )
    created_at: Mapped[datetime] = mapped_column(
        DateTime,
        nullable=False
    )