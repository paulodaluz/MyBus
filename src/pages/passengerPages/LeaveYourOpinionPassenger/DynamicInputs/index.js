import React from 'react';
import { Text, View } from 'react-native';
import { Input } from '../../../../components/Input';
import { styles } from './style';

const DynamicInputs = ({
	vehicleNameValue,
	onChangeTextVehicleName,
	onChangeTextFeedback,
	feedbackValue,
	feedbackRecipient,
}) => {
	return (
		<View style={styles.body}>
			{feedbackRecipient === 'company' && (
				<View style={styles.hideBusNameButton}>
					<Text style={styles.fieldName}>Nome do Veículo:</Text>
					<View style={styles.inputButtonTransport}>
						<Input
							placeholder="Digite o nome do transporte"
							textContentType="name"
							value={vehicleNameValue}
							onChangeText={onChangeTextVehicleName}
						/>
					</View>
				</View>
			)}

			<Text style={styles.fieldName}>Feedback:</Text>
			<View style={styles.inputButtonFeedback}>
				<Input
					placeholder="Digite seu feedback"
					textContentType="name"
					value={feedbackValue}
					onChangeText={onChangeTextFeedback}
				/>
			</View>
		</View>
	);
};

export { DynamicInputs };

