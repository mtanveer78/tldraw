import { Tldraw } from '@tldraw/tldraw'
import '@tldraw/tldraw/tldraw.css'
import SimpleButton from './SimpleButton'

export default function App() {
	return (
		<div className="tldraw__editor">
			<Tldraw
				persistenceKey="shape_meta_example"
				autoFocus
				onMount={(editor) => {
					editor.getInitialMetaForShape = (shape) => {
						return { label: `My ${shape.type} shape` }
					}
				}}
			>
				<SimpleButton />
			</Tldraw>
		</div>
	)
}


