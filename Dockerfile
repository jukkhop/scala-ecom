FROM openjdk:8

ENV SBT_VERSION 1.3.3
ENV SCALA_VERSION 2.11.12
ENV WORKDIR=/opt/scala-ecom

WORKDIR ${WORKDIR}

COPY .g8/ ${WORKDIR}/.g8
COPY app/ ${WORKDIR}/app
COPY conf/ ${WORKDIR}/conf
COPY project/ ${WORKDIR}/project
COPY public/ ${WORKDIR}/public
COPY src/ ${WORKDIR}/src
COPY build.sbt ${WORKDIR}/
COPY ./package.json ./yarn.lock ${WORKDIR}/
COPY openjdk-8-jdk.control /tmp/

ADD .env.production ${WORKDIR}/.env

RUN \
  curl -sL https://deb.nodesource.com/setup_12.x | bash - && \
  curl -sS https://dl.yarnpkg.com/debian/pubkey.gpg | apt-key add - && \
  echo "deb https://dl.yarnpkg.com/debian/ stable main" | tee /etc/apt/sources.list.d/yarn.list && \
  apt update && apt install -y --no-install-recommends equivs nodejs yarn && \
  rm -rf /var/lib/apt/lists/*

RUN \
  cd /tmp/ && equivs-build /tmp/openjdk-8-jdk.control; \
  curl -L -o sbt-$SBT_VERSION.deb http://dl.bintray.com/sbt/debian/sbt-$SBT_VERSION.deb; \
  dpkg -i openjdk-8-jdk_8u212-*.deb; \
  dpkg -i sbt-$SBT_VERSION.deb && \
  sbt sbtVersion

RUN \
  yarn --pure-lockfile && \
  yarn run build && \
  rm -rf ${WORKDIR}/public/* && \
  cp -r ${WORKDIR}/build/* ${WORKDIR}/public && \
  rm ${WORKDIR}/conf/application.conf && \
  mv ${WORKDIR}/conf/application-prod.conf ${WORKDIR}/conf/application.conf && \
  sbt dist && \
  unzip target/universal/scala-ecom-1.0.zip

EXPOSE 9000

CMD ["scala-ecom-1.0/bin/scala-ecom", "-Dplay.http.secret.key=${APPLICATION_SECRET}"]