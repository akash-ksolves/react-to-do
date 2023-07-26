import 'bootstrap/dist/css/bootstrap.css';
import {
	Button,
	Col,
	Container,
	FormControl,
	InputGroup,
	ListGroup,
	Row,
} from 'react-bootstrap';

import React, { Component } from 'react';

export default class App extends Component {
	constructor(props) {
		super(props);
		this.state = {
			userInput: '',
			list: [],
		};
	}

	updateInput(value) {
		this.setState({
			userInput: value,
		});
	}

	addItem() {
		if (this.state.userInput) {
			const userInput = {
				id: Math.random(),
				value: this.state.userInput,
			};

			const list = [...this.state.list];
			list.push(userInput);

			this.setState({
				userInput: '',
				list,
			});
		}
	}

	deleteItem(key) {
		const oldList = this.state.list;
		const list = oldList.filter((item) => item.id !== key);

		this.setState({
			list,
		});
	}

	editItem(index) {
		const todos = [...this.state.list];
		const editedTodo = prompt('Edit this todo');
		if (editedTodo && editedTodo.trim() !== '') {
			let updatedTodos = [...todos];
			updatedTodos[index].value = editedTodo;
			this.setState({
				list: updatedTodos,
			});
		}
	}

	render() {
		return (
			<Container>
				<Row
					style={{
						display: 'flex',
						justifyContent: 'center',
						alignItems: 'center',
						fontSize: '3rem',
						fontWeight: 'bolder',
					}}
				>
					To Do
				</Row>
				<hr />
				<Row>
					<Col md={{ span: 5, offset: 4 }}>
						<InputGroup className="mb-3">
							<FormControl
								placeholder="add item..."
								size="lg"
								value={this.state.userInput}
								onChange={(e) =>
									this.updateInput(e.target.value)
								}
								aria-label="add something"
								aria-describedby="basic-addon2"
							/>
							<InputGroup>
								<Button
									variant="dark"
									className="mt-2"
									onClick={() => this.addItem()}
								>
									Add
								</Button>
							</InputGroup>
						</InputGroup>
					</Col>
				</Row>
				<Row>
					<Col md={{ span: 5, offset: 4 }}>
						<ListGroup>
							{this.state.list.map((item, index) => {
								return (
									<div key={index}>
										<ListGroup.Item
											variant="dark"
											action
											style={{
												display: 'flex',
												justifyContent: 'space-between',
											}}
										>
											{item.value}
											<span>
												<Button
													style={{
														marginRight: '10px',
													}}
													variant="light"
													onClick={() =>
														this.deleteItem(item.id)
													}
												>
													Delete
												</Button>
												<Button
													style={{
														marginRight: '10px',
													}}
													variant="light"
													onClick={() =>
														this.editItem(index)
													}
												>
													Edit
												</Button>
											</span>
										</ListGroup.Item>
									</div>
								);
							})}
						</ListGroup>
					</Col>
				</Row>
			</Container>
		);
	}
}
