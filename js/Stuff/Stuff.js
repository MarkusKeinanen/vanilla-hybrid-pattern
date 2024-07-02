import { isServer, replaceNode } from '../utils.js';
import { Layout } from '../Layout/Layout.js';

export const Stuff = (serverProps) => {
	const initialProps = {
		showRow: true,
		...(serverProps || {}),
	};

	const template = (props = initialProps) => {
		return html`<div id="stuff">
			<h1>Other stuff</h2>
	
			<h2>Dropdown</h2>
			<select>
				<option>Lorem Ipsum 1</option>
				<option>Lorem Ipsum 2</option>
				<option>Lorem Ipsum 3</option>
				<option>Lorem Ipsum 4</option>
			</select>
	
			<h2>Table</h2>
			<table>
				<tr>
					<th>Column 1</th>
					<th>Column 2</th>
					<th>Column 3</th>
				</tr>
				<tr>
					<td>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</td>
					<td>Vivamus lacinia odio vitae vestibulum vestibulum.</td>
					<td>Cras venenatis euismod malesuada.</td>
				</tr>
				<tr>
					<td>Fusce vehicula dolor arcu, sit amet blandit dolor mollis nec.</td>
					<td>Donec viverra eleifend lacus, vitae ullamcorper metus.</td>
					<td>Curabitur sollicitudin ligula eu nisl suscipit, non varius nisl dapibus.</td>
				</tr>
				${
					props.showRow
						? html`<tr>
								<td>Pellentesque habitant morbi tristique senectus et netus.</td>
								<td>Etiam vel tortor sodales, aliquam eros eget, vehicula libero.</td>
								<td>Sed convallis urna at elit convallis, ac scelerisque magna pharetra.</td>
						  </tr>`
						: ''
				}
				
			</table>
			<button id="delete-table-btn">Toggle last row</button>
		</div>`;
	};

	if (isServer()) {
		return Layout({
			children: template(),
		});
	} else {
		//constructor / onMount
		window.stuff = {
			...(window.stuff || {}),
			...initialProps,
			render: () => {
				replaceNode('#stuff', template());
			},
		};
		window.stuff.render();

		//effects / event listeners (runs after render)
		requestAnimationFrame(() => {
			const btn = document.getElementById('delete-table-btn');
			btn.onclick = () => {
				window.stuff.showRow = !window.stuff.showRow;
				window.stuff.render(window.stuff);
			};
		});
	}
};
