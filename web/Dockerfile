FROM python:3
WORKDIR /app

ARG SECRET_KEY
ENV SECRET_KEY $SECRET_KEY

ARG DB_NAME
ENV DB_NAME $DB_NAME

ARG DB_USER
ENV DB_USER $DB_USER

ARG DB_PASS
ENV DB_PASS $DB_PASS

ARG DB_SERVICE
ENV DB_SERVICE $DB_SERVICE

ARG DB_PORT
ENV DB_PORT $DB_PORT

ENV PIP_DISABLE_PIP_VERSION_CHECK=on

RUN pip install poetry
COPY poetry.lock pyproject.toml /app/

RUN poetry config virtualenvs.create false
RUN poetry install --no-interaction

COPY . /app

RUN poetry run python manage.py collectstatic
