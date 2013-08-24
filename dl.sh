#!/bin/bash
curl http://localhost:3000/listings/delete/?key=a9c041f3-45fd-486c-b928-d44b1be7448e
curl http://localhost:3000/listings/upload -F filedata=@test/data.json
curl http://localhost:3000/listings/upload/ -F filedata=@data/1.json
curl http://localhost:3000/listings/upload/ -F filedata=@data/2.json
curl http://localhost:3000/listings/upload/ -F filedata=@data/3.json
curl http://localhost:3000/listings/upload/ -F filedata=@data/3.json
