import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { ActivityIndicator } from 'react-native';
import api from '../../services/api';
import {
 Container,
 Header,
 Avatar,
 Name,
 Bio,
 Stars,
 Starred,
 OwnerAvatar,
 Info,
 Title,
 Author,
} from './styles';

export default class User extends Component {
 static navigationOptions = ({ navigation }) => ({
  title: navigation.getParam('user').name,
 });

 static propTypes = {
  navigation: PropTypes.shape({
   getParam: PropTypes.func,
   navigate: PropTypes.func,
  }).isRequired,
 };

 state = {
  stars: [],
  loading: false,
  page: 1,
  refreshing: false,
 };

 async componentDidMount() {
  this.load();
 }

 load = async () => {
  const { navigation } = this.props;
  const { stars, page } = this.state;
  const user = navigation.getParam('user');

  this.setState({ loading: true });

  const response = await api.get(`/users/${user.login}/starred`, {
   params: { page },
  });

  this.setState({
   stars: page >= 2 ? [...stars, ...response.data] : response.data,
   page,
   refreshing: false,
   loading: false,
  });
 };

 loadMore = () => {
  const { page } = this.state;

  const next = page + 1;

  this.load(next);
 };

 refreshList = () => {
  this.setState({ refreshing: true, stars: [] }, this.load);
 };

 handleNavigate = repository => {
  const { navigation } = this.props;

  navigation.navigate('Repository', { repository });
 };

 render() {
  const { navigation } = this.props;
  const { stars, loading, refreshing } = this.state;
  const user = navigation.getParam('user');

  return (
   <Container>
    <Header>
     <Avatar source={{ uri: user.avatar }} />
     <Name>{user.name}</Name>
     <Bio>{user.bio}</Bio>
    </Header>

    {loading ? (
     <ActivityIndicator color="#3a2007" size={50} />
    ) : (
     <Stars
      data={stars}
      onRefresh={this.refreshList}
      refreshing={refreshing}
      onEndReachedThreshold={0.2}
      onEndReached={this.loadMore}
      keyExtractor={star => String(star.id)}
      renderItem={({ item }) => (
       <Starred onPress={() => this.handleNavigate(item)}>
        <OwnerAvatar source={{ uri: item.owner.avatar_url }} />
        <Info>
         <Title>{item.name}</Title>
         <Author>{item.owner.login}</Author>
        </Info>
       </Starred>
      )}
     />
    )}
   </Container>
  );
 }
}
