FROM node:carbon

ENV INSTALL_PATH /app/

WORKDIR $INSTALL_PATH
COPY . .

ENTRYPOINT ["./docker-entrypoint.sh"]

EXPOSE 5000

CMD ["start"]
