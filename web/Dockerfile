FROM python:3
WORKDIR /app


ENV PIP_DISABLE_PIP_VERSION_CHECK=on

RUN pip install poetry
COPY poetry.lock pyproject.toml /app/

RUN poetry config virtualenvs.create false
RUN poetry install --no-interaction

COPY . /app
