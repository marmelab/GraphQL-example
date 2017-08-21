import data from './data';
import { dataloaders as userDataloaders } from './user/resolvers';
import { dataloaders as statDataloaders } from './stat/resolvers';

export default request => ({
    author_id: 10, // should come from the request for an authentified user
    datastore: data,
    dataloaders: {
        ...userDataloaders(data),
        ...statDataloaders(data),
    },
});
