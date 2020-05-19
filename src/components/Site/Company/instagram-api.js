import React from 'react';

export const useInstagram = username => {
  const [feed, setFeed] = React.useState([]);
  const [profilePic, setProfilePic] = React.useState('');
  const url = `https://www.instagram.com/${username}/?__a=1`;

  React.useEffect(() => {
    if (username) {
      fetch(url)
        .then(response => response.json())
        .then(data => {
          const { user } = data.graphql;

          setProfilePic(user.profile_pic_url);

          const formattedFeed = user.edge_owner_to_timeline_media.edges.map(
            edge => ({
              picture: edge.node.display_url,
              description: edge.node.edge_media_to_caption.edges[0]
                ? edge.node.edge_media_to_caption.edges[0].node.text
                : 'No description'
            })
          );

          setFeed(formattedFeed.slice(0, 3));
        });
    }
  }, []);

  return [feed, profilePic];
};
