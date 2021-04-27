import React, { useEffect, useState } from 'react';
import { FlatList, Text, View } from 'react-native';
import { getCompanyFeedbackBackend } from '../../../backend/feedbacks/CompanyFeedbacks';
import { FeedbackContainer } from './FeedbackContainer';
import { Header } from './Header';
import { styles } from './style';

export default function ReceivedFeedbacks({ route }) {
	const { uid } = route.params;

	const [feedbacks, setFeedbacks] = useState([]);

	useEffect(() => {
		async function getFeedbacks() {
			setFeedbacks(await getCompanyFeedbackBackend(uid));
		}

		getFeedbacks();
	}, []);

	const renderItem = ({ item }) => <FeedbackContainer feedback={item} />;

	return (
		<View style={styles.container}>
			<View style={styles.header}>
				<Header />
			</View>

			{feedbacks.length < 1 && (
				<Text style={styles.dontHaveFeedback}>Não há feedbacks até o momento!</Text>
			)}

			<View style={styles.body}>
				<FlatList
					style={styles.list}
					data={feedbacks}
					renderItem={renderItem}
					showsVerticalScrollIndicator={false}
					keyExtractor={(item) => item.id}
				/>
			</View>
		</View>
	);
}
