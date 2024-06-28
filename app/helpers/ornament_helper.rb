module OrnamentHelper
	ORNAMENTS = {
		grass: ['a', 'A'],
		barb: ['b', 'B'],
		rose: ['c', 'C'],
		thorned_heart: ['d', 'D'],
		chandelier: ['e', 'E'],
		feather: ['f', 'F'],
		dotted_rune: ['h', 'H'],
		viol: ['g', 'G'],
		spear: ['i', 'I'],
		rune: ['J', 'j'],
		trident: ['k', 'K'],
		spike: ['l', 'L'],
		arrowhead: ['m', 'M'],
		bramble: ['n', 'N'],
		cornucopia: ['o', 'O'],
		bouquet: ['p', 'P'],
		heart: ['q', 'Q'],
		barbed_arrowhead: ['r', 'R'],
		jester: ['s', 'S'],
		carnation: ['t', 'T'],
		sheaf: ['u', 'U'],
		semicircle: ['v', 'V'],
		scale: ['w', 'W'],
		thistle: ['x', 'X'],
		phoenix: ['y', 'Y'],
		dagger: ['z', 'Z'],
		wave: ['(', ')'],
		wind: ['[', ']'],
		notch: ['<', '>']
	}

	def ornamented(ornament, content = '', as: 'div', &block)
		content = capture(&block) if block_given?

		content_tag as, class: 'ornamented' do
			concat tag.span(ORNAMENTS[ornament][0], class: 'ornament', aria: { hidden: true })
			concat content
			concat tag.span(ORNAMENTS[ornament][1], class: 'ornament', aria: { hidden: true })
		end
	end
end
