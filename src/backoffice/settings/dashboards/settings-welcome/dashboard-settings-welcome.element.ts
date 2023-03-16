import { UUITextStyles } from '@umbraco-ui/uui-css/lib';
import { css, html, LitElement } from 'lit';
import { customElement } from 'lit/decorators.js';

@customElement('umb-dashboard-settings-welcome')
export class UmbDashboardSettingsWelcomeElement extends LitElement {
	static styles = [
		UUITextStyles,
		css`
			#settings-dashboard {
				display: grid;
				grid-gap: var(--uui-size-7);
				grid-template-columns: repeat(3, 1fr);
			}

			@media (max-width: 1200px) {
				#settings-dashboard {
					grid-template-columns: repeat(2, 1fr);
				}
			}

			@media (max-width: 800px) {
				#settings-dashboard {
					grid-template-columns: repeat(1, 1fr);
				}
			}
		`,
	];

	render() {
		return html`
			<section id="settings-dashboard">
				<uui-box>
					<h2>Documentation</h2>
					<p>Read more about working with the items in Settings in our Documentation.</p>
					<uui-button
						look="primary"
						href="https://docs.umbraco.com/umbraco-cms/umbraco-cms"
						label="Get the help you need"
						target="_blank"
						rel="noopener">
						Get the help you need
					</uui-button>
				</uui-box>

				<uui-box>
					<h2>Community</h2>
					<p>Ask a question in the community forum or our Discord community</p>
					<uui-button
						look="primary"
						href="https://our.umbraco.com/forum"
						label="Go to the forum"
						target="_blank"
						rel="noopener">
						Go to the forum
					</uui-button>
					<uui-button
						look="primary"
						href="https://discord.umbraco.com"
						label="Chat with the community"
						target="_blank"
						rel="noopener">
						Chat with the community
					</uui-button>
				</uui-box>

				<uui-box class="training">
					<h2>Training</h2>

					<p>Find out about real-life training and certification opportunities</p>
					<uui-button
						look="primary"
						href="https://umbraco.com/training/"
						label="Get Certified"
						target="_blank"
						rel="noopener">
						Get Certified
					</uui-button>
				</uui-box>

				<uui-box>
					<h2>Support</h2>
					<p>Ask a question in the community forum or our Discord community.</p>
					<uui-button
						look="primary"
						href="https://umbraco.com/support/"
						label="Get the help you need"
						target="_blank"
						rel="noopener">
						Get the help you need
					</uui-button>
				</uui-box>

				<uui-box>
					<h2>Videos</h2>
					<p>
						Watch our free tutorial videos on the Umbraco Learning Base YouTube channel, to get upto speed quickly with
						Umbraco.
					</p>
					<uui-button
						look="primary"
						href="https://www.youtube.com/c/UmbracoLearningBase"
						label="Watch the videos"
						target="_blank"
						rel="noopener">
						Watch the videos
					</uui-button>
				</uui-box>
			</section>
		`;
	}
}

export default UmbDashboardSettingsWelcomeElement;
declare global {
	interface HTMLElementTagNameMap {
		'umb-dashboard-settings-welcome': UmbDashboardSettingsWelcomeElement;
	}
}
