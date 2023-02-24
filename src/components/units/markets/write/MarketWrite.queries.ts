import { gql } from "@apollo/client";

export const CREATE_USED_ITEM = gql`
  mutation createUsedItem($createUseditemInput: CreateUseditemInput!) {
    createUsedItem(createUseditemInput: $createUseditemInput) {
      _id
      name
      remarks
      contents
      price
      tags
      useditemAddress {
        address
        addressDetail
        lat
        lng
      }
      images
    }
  }
`;

export const UPDATE_USED_ITEM = gql`
  mutation updateUseditem(
    $updateUseditemInput: UpdateUseditemInput!
    $useditemId: ID!
  ) {
    updateUseditem(
      updateUseditemInput: $updateUseditemInput
      useditemId: $useditemId
    ) {
      _id
      name
      remarks
      contents
      price
      tags
      images
      pickedCount
      useditemAddress {
        _id
        zipcode
        address
        addressDetail
        lat
        lng
        createdAt
      }
    }
  }
`;
