/* This example requires Tailwind CSS v2.0+ */
import { CheckIcon } from '@heroicons/react/outline'

const pricing = {
  tiers: [
    {
      title: 'Custom A',
      price: 32,
      frequency:  ' earnings / month',
      description: 'Choose an contract standard already set.',
      features: [
        'Feature', 
        'Feature', 
        'Feature', 
        'Feature'
      ],
      cta: 'Coming soon',
      mostPopular: false,
    },
    {
      title: 'Standard Master',
      price: 2,
      frequency: ' earnings / month',
      description: 'Choose an contract standard already set.',
      features: [
        'Feature',
        'Feature',
        'Feature',
        'Feature',
        'Feature',
      ],
      cta: 'Choose Contract',
      mostPopular: true,
    },
    {
      title: 'Custom B',
      price: 1,
      frequency: '/ month',
      description: 'Choose an contract standard already set.',
      features: [
        'Feature',
        'Feature',
        'Feature',
        'Feature',
        'Feature',
        'Feature',
      ],
      cta: 'Coming soon',
      mostPopular: false,
    },
  ],
}

function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}

export default function Example() {
  return (
    <div className=" mx-auto py-8 px-4 bg-white sm:px-6 lg:px-8">
     
      <p className="text-lg text-gray-500">
        Choose an contract standard already set with the most used conditions in the industry, share revenues with other rights owners and receive automated payments.
      </p>

      {/* Tiers */}
      <div className="mt-24 space-y-12 lg:space-y-0 lg:grid lg:grid-cols-3 lg:gap-x-8">
        {pricing.tiers.map((tier) => (
          <div
            key={tier.title}
            className="relative p-8 bg-white border border-gray-200 rounded-2xl shadow-sm flex flex-col"
          >
            <div className="flex-1">
              <h3 className="text-xl font-semibold text-gray-900">{tier.title}</h3>
              {tier.mostPopular ? (
                <p className="absolute top-0 py-1.5 px-4 bg-indigo-500 rounded-full text-xs font-semibold uppercase tracking-wide text-white transform -translate-y-1/2">
                  Most popular
                </p>
              ) : null}
              <p className="mt-4 flex items-baseline text-gray-900">
              </p>
              <p className="mt-6 text-gray-500">{tier.description}</p>

              {/* Feature list */}
              <ul role="list" className="mt-6 space-y-6">
                {tier.features.map((feature) => (
                  <li key={feature} className="flex">
                    <CheckIcon className="flex-shrink-0 w-6 h-6 text-indigo-500" aria-hidden="true" />
                    <span className="ml-3 text-gray-500">{feature}</span>
                  </li>
                ))}
              </ul>
            </div>

            <a
              href="/edit-contract"
              className={classNames(
                tier.mostPopular
                  ? 'bg-indigo-500 text-white hover:bg-indigo-600'
                  : 'bg-indigo-50 text-indigo-700 hover:bg-indigo-100',
                'mt-8 block w-full py-3 px-6 border border-transparent rounded-md text-center font-medium'
              )}
            >
              {tier.cta}
            </a>
          </div>
        ))}
      </div>
    </div>
  )
}
