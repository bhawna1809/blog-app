import React, { useState } from 'react';
import {
	View, Button, TextInput, Text,
	FlatList, StyleSheet, TouchableOpacity
} from 'react-native';

const data = [
	{
		id: 1, title: 'Chandrashila',
		content: `Chandrashila is the summit above Tungnath temple in India. It literally means "Moon Rock". It is located at a height of about 3,690 metres (12,110 ft) above sea level. This peak provides views of the Himalayas, including Nandadevi, Trisul, Kedar Peak, 
		Bandarpunch and Chaukhamba peaks.` },
	{
		id: 2, title: 'Sikkim',
		content: `Sikkim is a state in northeastern India. It borders the Tibet Autonomous Region of China 
		in the north and northeast, Bhutan in the east, Koshi Province of Nepal in the west, and West Bengal in the south` },
{
				id: 3, title: 'Wayanad',
		content: `Wayanad is a district in the north-east of the Indian state of Kerala, with its administrative headquarters at the municipality of Kalpetta. It is the only plateau in Kerala.` },
	// Add more blog posts here
];

const App = () => {
	const [selectedPost, setSelectedPost] = useState(null);
	const [newPostTitle, setNewPostTitle] = useState('');
	const [newPostContent, setNewPostContent] = useState('');
	const [posts, setPosts] = useState(data);
	const [error, setError] = useState('');

	const addNewPost = () => {
		if (newPostTitle.trim() === '' ||
			newPostContent.trim() === '') {
			setError('Title and content cannot be empty');
			return;
		} else {
			setError('');
		}

		const id = posts.length + 1;
		const newPost =
		{
			id, title: newPostTitle,
			content: newPostContent
		};
		setPosts([...posts, newPost]);
		setNewPostTitle('');
		setNewPostContent('');
	};

	const deletePost = (postId) => {
		const updatedPosts =
			posts.filter(
				(post) =>
					post.id !== postId);
		setPosts(updatedPosts);
	};

	const renderItem = ({ item }) => (
		<TouchableOpacity
			onPress={() => setSelectedPost(item)}>
			<View style={styles.postContainer}>
				<Text style={styles.postTitle}>
					{item.title}
				</Text>
				<Text style={styles.postContent}>
					{item.content}
				</Text>
				<TouchableOpacity style={styles.deleteButton}
					onPress={() => deletePost(item.id)}>
					<Text style={styles.deleteButtonText}>
						Delete
					</Text>
				</TouchableOpacity>
			</View>
		</TouchableOpacity>
	);

	return (
		<View style={styles.container}>
			<View style={styles.headingContainer}>
				<Text style={styles.heading}> Travel Blog </Text>
			</View>
			{!selectedPost ? (
				<FlatList
					data={posts}
					renderItem={renderItem}
					keyExtractor={(item) => item.id.toString()}
				/>
			) : (
				<View style={styles.selectedPostContainer}>
					<Text style={styles.selectedPostTitle}>
						{selectedPost.title}
					</Text>
					<Text style={styles.selectedPostContent}>
						{selectedPost.content}
					</Text>
					<TouchableOpacity style={styles.backButton}
						onPress={() => setSelectedPost(null)}>
						<Text style={styles.backButtonText}>
							Back
						</Text>
					</TouchableOpacity>
				</View>
			)}
			{selectedPost === null && (
				<View style={styles.formContainer}>
					{error !== '' &&
						<Text style={styles.errorText}>
							{error}
						</Text>}
					<TextInput
						style={styles.input}
						placeholder="Enter Title"
						value={newPostTitle}
						onChangeText={setNewPostTitle}
					/>
					<TextInput
						style={[styles.input, styles.textArea]}
						placeholder="Enter Content"
						value={newPostContent}
						onChangeText={setNewPostContent}
						multiline={true}
					/>
					<Button title="Add New Post"
						onPress={() => addNewPost()} />
				</View>
			)}
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
		paddingTop: 40,
		paddingHorizontal: 20,
	},
	headingContainer: {
		backgroundColor: '#3498db',
		padding: 10,
		borderRadius: 10,
		marginBottom: 20,
	},
	heading: {
		fontSize: 24,
		fontWeight: 'bold',
		textAlign: 'center',
		color: 'white',
	},
	postContainer: {
		borderWidth: 1,
		borderColor: '#ccc',
		padding: 20,
		marginBottom: 20,
		borderRadius: 10,
	},
	postTitle: {
		fontSize: 18,
		fontWeight: 'bold',
		marginBottom: 10,
	},
	postContent: {
		fontSize: 16,
	},
	deleteButton: {
		alignSelf: 'flex-end',
		marginTop: 10,
	},
	deleteButtonText: {
		color: 'red',
	},
	selectedPostContainer: {
		padding: 20,
		marginBottom: 20,
		borderWidth: 1,
		borderColor: '#ccc',
		borderRadius: 10,
	},
	selectedPostTitle: {
		fontSize: 24,
		fontWeight: 'bold',
		marginBottom: 10,
	},
	selectedPostContent: {
		fontSize: 16,
	},
	backButton: {
		alignSelf: 'flex-end',
		marginTop: 20,
	},
	backButtonText: {
		color: 'blue',
		fontSize: 16,
	},
	formContainer: {
		padding: 20,
		borderWidth: 1,
		borderColor: '#00008B',
		borderRadius: 10,
		marginBottom: 20,
	},
	input: {
		borderWidth: 1,
		borderColor: '#ccc',
		padding: 10,
		marginBottom: 10,
		borderRadius: 5,
	},
	textArea: {
		height: 100,
	},
	errorText: {
		color: 'red',
		textAlign: 'center',
		marginBottom: 10,
	},
});

export default App;
