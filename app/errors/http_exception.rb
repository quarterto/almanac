module HttpException
	class Base < StandardError
		def status_code
			raise NotImplementedError
		end
	end

	Rack::Utils::SYMBOL_TO_STATUS_CODE.each do |name, status|
		next if name == :'(unused)'

		klass = Class.new(HttpException::Base) do
			define_method('status_code') do
				status
			end
		end

		HttpException.const_set name.to_s.camelize, klass
		ActionDispatch::ExceptionWrapper.rescue_responses[klass.name] = name
	end
end
