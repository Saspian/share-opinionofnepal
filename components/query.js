import { gql } from "@apollo/client";

export const OPINION_LIST = gql`
  query OpinionsList($q: String, $sector: String) {
    opinions(q: $q, sector: $sector) {
      _id
      title
      text
      sector
      thumbnail
      approved
      date
      posted
      reaction
      comments {
        opinionId
        avatar
        author {
          _id
          name
          email
          pnum
          DOB
          gender
          prof
          address
          date
          profileImage
        }
        content
        datetime
        createdAt
        updatedAt
      }
      postedBy {
        _id
        name
        email
        pnum
        DOB
        gender
        prof
        address
        date
        profileImage
        savedArticles
        reactedArticles
      }
    }
  }
`;

export const SINGLE_OPINION = gql`
  query SingleOpinion($opinion_id: String!) {
    opinion(opinion_id: $opinion_id) {
      _id
      title
      text
      sector
      thumbnail
      approved
      date
      posted
      reaction
      comments {
        opinionId
        avatar
        author {
          _id
          name
          email
          pnum
          DOB
          gender
          prof
          address
          date
          profileImage
        }
        content
        datetime
        createdAt
        updatedAt
      }
      postedBy {
        _id
        name
        email
        pnum
        DOB
        gender
        prof
        address
        date
        profileImage
        savedArticles
        reactedArticles
      }
    }
  }
`;
