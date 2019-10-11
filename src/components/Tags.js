import React from 'react';
import styled from 'styled-components/macro';
import classnames from 'classnames';
import Tooltip from '@material-ui/core/Tooltip';

const TagsContainer = styled.ul`
  display: block;
  margin: 0 0 -5px 0;
  padding: 0;
  list-style: none;
`;

const Tag = styled.li`
  display: inline-block;
  height: 26px;
  padding: 0 10px;
  margin: 0 5px 5px 0;
  background-color: #666;
  line-height: 26px;
  border-radius: 3px;
  color: white;
  font-size: 13px;

  &:last-child {
    margin: 0;
  }

  &.small {
    height: 20px;
    line-height: 20px;
    font-size: 11px;
  }

  &.medium {
    height: 26px;
    line-height: 26px;
    font-size: 13px;
  }

  &.large {
    height: 32px;
    line-height: 32px;
    font-size: 16px;
  }
`;

const Tags = ({ tags, limit, className = '', size = 'medium' }) => {
  const tagClassNames = classnames({
    [size]: true
  });
  let renderTags = tags;
  let moreTags;
  let plusTag;
  if (limit) {
    renderTags = tags.slice(0, limit);
    moreTags = tags.slice(limit);
    if (limit < tags.length) {
      const moreTagNames = moreTags.map(tag => tag.name);
      plusTag = (
        <Tooltip title={moreTagNames.join(', ')} placement="top">
          <Tag className={tagClassNames}>+{tags.length - limit}</Tag>
        </Tooltip>
      );
    }
  }
  return (
    <TagsContainer className={className}>
      {renderTags.map(({ name, id }, i) => (
        <Tag className={tagClassNames} key={id}>
          {name}
        </Tag>
      ))}
      {plusTag}
    </TagsContainer>
  );
};

export default Tags;
