import React, {
	useState,
	createContext,
	useContext,
	useEffect,
	useCallback,
} from 'react'
import onlyValidAttributes from '@apaleslimghost/only-valid-attributes'

export const getInputValue = el =>
	el[
		{
			number: 'valueAsNumber',
			range: 'valueAsNumber',
			date: 'valueAsDate',
			checkbox: 'checked',
			radio: 'value',
		}[el.type] || 'value'
	]

export const getSelectValue = el => el.options[el.selectedIndex].value

const Fields = createContext(null)
const SetFields = createContext(null)

export const useFormFields = () => useContext(Fields)
export const useFormSet = () => useContext(SetFields)

const qq = (a, b) => (a === undefined ? b : a)

export const Input = ({
	name,
	fieldRef,
	tag: Tag = 'input',
	onChange,
	...props
}) => {
	const fields = useFormFields()
	const setFields = useFormSet()

	return (
		<Tag
			ref={fieldRef}
			name={name}
			type='text'
			{...onlyValidAttributes(props)}
			value={
				fields
					? qq(name in fields ? fields[name] : props.value, '')
					: 'value' in props
					? props.value
					: undefined /* uncontrolled component if there's no */
			}
			onChange={ev => {
				if (setFields) {
					if (props.type !== 'radio' || ev.target.checked) {
						setFields({
							[name]: getInputValue(ev.target),
						})
					}
				}

				if (onChange) {
					onChange(ev)
				}
			}}
		/>
	)
}

export const Textarea = props => {
	return <Input tag='textarea' {...props} />
}

export const Select = ({ tag: Tag = 'select', ...props }) => {
	const fields = useFormFields()
	const setFields = useFormSet()

	return (
		<Tag
			{...onlyValidAttributes(props)}
			value={
				fields
					? (props.name in fields ? fields[props.name] : props.value) || ''
					: 'value' in props
					? props.value
					: undefined
			}
			onChange={ev => {
				if (props.onChange) {
					props.onChange(ev)
				}

				if (setFields) {
					setFields({
						[props.name]: getSelectValue(ev.target),
					})
				}
			}}
		>
			{props.children}
		</Tag>
	)
}

export const Form = ({
	initialData = {},
	name,
	tag: Tag = 'form',
	onChange,
	onSubmit: _onSubmit,
	onDidSubmit,
	...props
}) => {
	const setContextFields = useFormSet()
	const [fields, _setFields] = useState(initialData)

	useEffect(() => {
		if (setContextFields && name) {
			setContextFields({
				[name]: fields,
			})
		}

		if (onChange) {
			onChange(fields)
		}
	}, [fields, name, onChange, setContextFields])

	const setFields = useCallback(
		childFields => {
			_setFields(currentFields => ({ ...currentFields, ...childFields }))
		},
		[_setFields],
	)

	async function onSubmit(ev) {
		// TODO validation?
		ev.preventDefault()

		await _onSubmit(fields)
		_setFields(initialData)

		if (onDidSubmit) {
			onDidSubmit(fields)
		}
	}

	return (
		<Fields.Provider value={fields}>
			<SetFields.Provider value={setFields}>
				<Tag
					{...onlyValidAttributes(props)}
					{...(_onSubmit ? { onSubmit } : {})}
				/>
			</SetFields.Provider>
		</Fields.Provider>
	)
}
