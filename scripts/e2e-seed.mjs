// Fixed, synthetic data. The host and demo project are deliberately not configurable.
const project = 'demo-mybus';
const request = async (url, method, body) => {
	const response = await fetch(url, {
		method,
		headers: { 'Content-Type': 'application/json', Authorization: 'Bearer owner' },
		body: body === undefined ? undefined : JSON.stringify(body),
	});
	if (!response.ok) throw new Error(`${method} ${new URL(url).pathname}: ${response.status}`);
	return response.status === 204 ? undefined : response.json();
};
await request(`http://127.0.0.1:9099/emulator/v1/projects/${project}/accounts`, 'DELETE');
await request(
	`http://127.0.0.1:8080/emulator/v1/projects/${project}/databases/(default)/documents`,
	'DELETE'
);
await request(`http://127.0.0.1:9000/.json?ns=${project}`, 'DELETE');
const field = (value) => {
	if (typeof value === 'string') return { stringValue: value };
	if (typeof value === 'number') return { doubleValue: value };
	if (typeof value === 'boolean') return { booleanValue: value };
	return { arrayValue: { values: value.map(field) } };
};
let companyUid;
for (const [role, collection] of [
	['passenger', 'passengers'],
	['company', 'companies'],
]) {
	const account = await request(
		'http://127.0.0.1:9099/identitytoolkit.googleapis.com/v1/accounts:signUp?key=demo-key',
		'POST',
		{ email: `${role}@mybus.test`, password: 'Testpass123', returnSecureToken: true }
	);
	if (role === 'company') companyUid = account.localId;
	const data = {
		uid: account.localId,
		name: `Teste ${role}`,
		city: 'Passo Fundo/RS',
		email: `${role}@mybus.test`,
		isPassenger: role === 'passenger',
		linked_vehicles: role === 'company' ? ['TEST123'] : [],
		codes_private_vehicles: [],
		type_of_vehicle_listed: 'public',
	};
	await request(
		`http://127.0.0.1:8080/v1/projects/${project}/databases/(default)/documents/${collection}?documentId=${role}`,
		'POST',
		{ fields: Object.fromEntries(Object.entries(data).map(([key, value]) => [key, field(value)])) }
	);
}
for (const [collection, data] of [
	[
		'vehicles',
		{
			name: 'Onibus privado E2E',
			registration_plate: 'TEST123',
			is_public: false,
			id_to_passengers: '#E2ETEST',
			password_to_share_localization: 'Testpass123',
			id_to_share_localization: 'TEST123',
		},
	],
	[
		'vehicle_functions',
		{
			registration_plate: 'TEST123',
			wifi: true,
			washrooms: false,
			air_conditioning: true,
			suport_wheelchair: true,
			price_transport: '5',
		},
	],
]) {
	await request(
		`http://127.0.0.1:8080/v1/projects/${project}/databases/(default)/documents/${collection}?documentId=fixture`,
		'POST',
		{ fields: Object.fromEntries(Object.entries(data).map(([key, value]) => [key, field(value)])) }
	);
}
await request(
	`http://127.0.0.1:9000/real_time_database/${companyUid}/TEST123.json?ns=${project}`,
	'PUT',
	{ latitude: -28.2612, longitude: -52.4083, status: 'Operando Normalmente' }
);
console.log('Synthetic accounts seeded in local demo-mybus emulators.');
