if [ "$EVENT_NAME" == "push" ]; then
  echo "ENVIRONMENT=qa" >> $GITHUB_ENV
elif [ "$EVENT_NAME" == "release" ]; then
  # relese tag will be something like this v1.1.1-prod
  RELEASE_TAG="${{ github.event.release.tag_name }}"
  ENVIRONMENT=$(echo "$RELEASE_TAG" | awk -F'-' '{print $2}')
  echo "ENVIRONMENT=$ENVIRONMENT" >> $GITHUB_ENV
else
  exit 1
fi
