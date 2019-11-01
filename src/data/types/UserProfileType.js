import {
  GraphQLObjectType as ObjectType,
  GraphQLID as ID,
  GraphQLString as StringType,
  GraphQLNonNull as NonNull,
} from 'graphql';

const UserProfileType = new ObjectType({
  name: 'UserProfie',
  fields: {
    userId: { type: new NonNull(ID) },
    displayName: { type: StringType },
    picture: { type: StringType },
  },
});

export default UserProfileType;
