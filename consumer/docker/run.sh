docker stop es01-test
docker stop kib01-test
docker rm es01-test
docker rm kib01-test
 
docker pull docker.elastic.co/elasticsearch/elasticsearch:7.17.0
docker run -d --name es01-test --net elastic -p 127.0.0.1:9200:9200 -p 127.0.0.1:9300:9300 -e "discovery.type=single-node" docker.elastic.co/elasticsearch/elasticsearch:7.17.0
docker pull docker.elastic.co/kibana/kibana:7.17.0
docker run -d --name kib01-test --net elastic -p 127.0.0.1:5601:5601 -e "ELASTICSEARCH_HOSTS=http://es01-test:9200" docker.elastic.co/kibana/kibana:7.17.0
