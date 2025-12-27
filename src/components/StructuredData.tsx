import Script from 'next/script'

interface OrganizationData {
  name: string
  url: string
  logo?: string
  description?: string
  sameAs?: string[]
}

interface WebSiteData {
  name: string
  url: string
  description: string
  potentialAction?: {
    '@type': string
    target: string
    'query-input': string
  }
}

interface SoftwareApplicationData {
  name: string
  applicationCategory: string
  operatingSystem: string
  description: string
  url: string
  offers?: {
    '@type': string
    price: string
    priceCurrency: string
  }
}

interface StructuredDataProps {
  organization?: OrganizationData
  website?: WebSiteData
  softwareApplication?: SoftwareApplicationData
}

export default function StructuredData({
  organization,
  website,
  softwareApplication
}: StructuredDataProps) {
  const structuredData: any[] = []

  if (organization) {
    structuredData.push({
      '@context': 'https://schema.org',
      '@type': 'Organization',
      name: organization.name,
      url: organization.url,
      logo: organization.logo,
      description: organization.description,
      sameAs: organization.sameAs
    })
  }

  if (website) {
    const websiteSchema: any = {
      '@context': 'https://schema.org',
      '@type': 'WebSite',
      name: website.name,
      url: website.url,
      description: website.description
    }

    if (website.potentialAction) {
      websiteSchema.potentialAction = website.potentialAction
    }

    structuredData.push(websiteSchema)
  }

  if (softwareApplication) {
    const appSchema: any = {
      '@context': 'https://schema.org',
      '@type': 'SoftwareApplication',
      name: softwareApplication.name,
      applicationCategory: softwareApplication.applicationCategory,
      operatingSystem: softwareApplication.operatingSystem,
      description: softwareApplication.description,
      url: softwareApplication.url
    }

    if (softwareApplication.offers) {
      appSchema.offers = softwareApplication.offers
    }

    structuredData.push(appSchema)
  }

  if (structuredData.length === 0) return null

  return (
    <Script
      id="structured-data"
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(structuredData)
      }}
    />
  )
}