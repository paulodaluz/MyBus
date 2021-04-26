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
		<View style={styles.container}>
			{feedbackRecipient === 'company' && (
				<View style={styles.hideBusNameInput}>
					<Text style={styles.fieldName}>Nome do Veículo:</Text>

					<View style={styles.inputTransportName}>
						<Input
							placeholder="Digite o nome do transporte"
							textContentType="name"
							value={vehicleNameValue}
							onChangeText={onChangeTextVehicleName}
						/>
					</View>
				</View>
			)}

			<Text style={{ ...styles.fieldName, ...styles.inputSpacing }}>Feedback:</Text>

			<View style={styles.inputFeedback}>
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

