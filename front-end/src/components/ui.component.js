import React, { Component } from "react";
import Modal from 'react-modal';




export default class ui extends Component {
	constructor(props) {
		super(props);
		this.onChangeDisease = this.onChangeDisease.bind(this);
		this.onChangeDrug = this.onChangeDrug.bind(this);
		this.searchAuthors = this.searchAuthors.bind(this);
		this.handleOpenModal = this.handleOpenModal.bind(this);
		this.handleCloseModal = this.handleCloseModal.bind(this);

		this.state = {
			authors: [],
			drug: "",
			disease: "",
			showModal: false,
			modalActiveAuthor: null
		};
	}

	componentDidMount() {
	}

	handleOpenModal(author) {
		this.setState({ showModal: true, modalActiveAuthor: author });
	}

	handleCloseModal() {
		this.setState({ showModal: false, renderModal: false });
	}

	onChangeDisease(e) {
		const disease = e.target.value;

		this.setState({
			disease: disease
		});
	}

	onChangeDrug(e) {
		const drug = e.target.value;

		this.setState({
			drug: drug
		});
	}



	searchAuthors() {
		fetch(`http://localhost:8765/authors/${this.state.drug}/${this.state.disease}/`)
			.then(res => res.json())
			.then((data) => {
				this.setState({
					authors: data
				});
			})
	}

	renderPaperTable(author) {
		return (
			(!author) ? ('') :
				(<table>
					<tbody>
						<tr>
							<th key={0}>Paper</th>
							<th key={1}>Journal</th>
						</tr>
						{author.papers.map((paper, index) => {
							return (
								<tr key={index}>
									<td>{paper.title}</td>
									<td>{paper.journal}</td>
								</tr>
							)
						})}
					</tbody>
				</table>)
		)

	}

	renderTableData() {
		return this.state.authors.map((author, index) => {
			return (
				<tr key={index}>
					<td>{author['_id'].firstName}</td>
					<td>{author['_id'].lastName}</td>
					<td>{author['count']}</td>
					<td>
						<button onClick={() => this.handleOpenModal(author)}>Show Papers</button>
						<Modal
							isOpen={this.state.showModal}
						>
							{this.renderPaperTable(this.state.modalActiveAuthor)}
							<button onClick={this.handleCloseModal}>Close</button>
						</Modal>
					</td>
				</tr>
			)
		})
	}


	renderTableHeader() {
		let header = ['First Name', 'Last Name', 'Papers', 'Show Papers/Journals']
		return header.map((key, index) => {
			return <th key={index}>{key}</th>
		})
	}

	renderTable() {
		if (this.state.authors.length !== 0) {
			return (
				<table id='authors'>
					<tbody>
						<tr>{this.renderTableHeader()}</tr>
						{this.renderTableData()}
					</tbody>
				</table>
			)
		}
		else return ('');
	}

	render() {
		const { authors, drug, disease } = this.state;

		return (
			<div className="list row">
				<div className="col-md-8">
					<div className="input-group mb-3">
						<input
							type="text"
							className="form-control"
							placeholder="Disease"
							value={disease}
							onChange={this.onChangeDisease}
						/>
						<input
							type="text"
							className="form-control"
							placeholder="Drug"
							value={drug}
							onChange={this.onChangeDrug}
						/>
						<div className="input-group-append">
							{this.state.showModal ? ('') : (
								<button
								className="btn btn-outline-secondary"
								type="button"
								onClick={this.searchAuthors}
							>
								Search
              					</button>
							)}
						</div>
					</div>
				</div>
				<div className="col-md-6">
					{this.renderTable()}
				</div>
			</div>
		);
	}
}
