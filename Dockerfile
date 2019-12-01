FROM openjdk:8

WORKDIR /opt/ecom-api

ADD . /opt/ecom-api

ENV SBT_VERSION 0.13.15
ENV SCALA_VERSION 2.11.12

RUN apt update && apt install -y --no-install-recommends equivs; \
  rm -rf /var/lib/apt/lists/*

COPY openjdk-8-jdk.control /tmp/

RUN cd /tmp/ && equivs-build /tmp/openjdk-8-jdk.control; \
  curl -L -o sbt-$SBT_VERSION.deb http://dl.bintray.com/sbt/debian/sbt-$SBT_VERSION.deb; \
  dpkg -i openjdk-8-jdk_8u212-*.deb; \
  dpkg -i sbt-$SBT_VERSION.deb

EXPOSE 9000

CMD sbt run