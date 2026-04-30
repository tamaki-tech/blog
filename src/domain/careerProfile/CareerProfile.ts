export type CareerPeriodJson = {
  start: string
  end: string | null
  label: string
}

export type CareerTechnologiesJson = {
  os?: string[]
  databases?: string[]
  languages?: string[]
  frameworksAndTools?: string[]
}

export type CareerProjectJson = {
  title: string
  period: CareerPeriodJson
  role: string
  position: string | null
  teamSize: number | null
  description: string
  responsibilities: string[]
  technologies: CareerTechnologiesJson
}

export type CareerCompanyJson = {
  company: string
  companyPeriod: CareerPeriodJson
  business: string
  projects: CareerProjectJson[]
}

export type CareerProfileJson = {
  timeline: CareerCompanyJson[]
}

type CareerPeriodProps = {
  start: string
  end: string | null
  label: string
}

export class CareerPeriod {
  private readonly start: string
  private readonly end: string | null
  private readonly label: string

  constructor(props: CareerPeriodProps) {
    this.start = props.start
    this.end = props.end
    this.label = props.label
  }

  static fromJson(json: CareerPeriodJson) {
    return new CareerPeriod({
      start: json.start,
      end: json.end,
      label: json.label,
    })
  }

  getStart() {
    return this.start
  }

  getEnd() {
    return this.end
  }

  getLabel() {
    return this.label
  }
}

type CareerTechnologiesProps = {
  os: string[]
  databases: string[]
  languages: string[]
  frameworksAndTools: string[]
}

export class CareerTechnologies {
  private readonly os: string[]
  private readonly databases: string[]
  private readonly languages: string[]
  private readonly frameworksAndTools: string[]

  constructor(props: CareerTechnologiesProps) {
    this.os = props.os
    this.databases = props.databases
    this.languages = props.languages
    this.frameworksAndTools = props.frameworksAndTools
  }

  static fromJson(json: CareerTechnologiesJson) {
    return new CareerTechnologies({
      os: json.os ?? [],
      databases: json.databases ?? [],
      languages: json.languages ?? [],
      frameworksAndTools: json.frameworksAndTools ?? [],
    })
  }

  getNames() {
    return [
      ...this.os,
      ...this.databases,
      ...this.languages,
      ...this.frameworksAndTools,
    ]
  }
}

type CareerProjectProps = {
  title: string
  period: CareerPeriod
  role: string
  position: string | null
  teamSize: number | null
  description: string
  responsibilities: string[]
  technologies: CareerTechnologies
}

export class CareerProject {
  private readonly title: string
  private readonly period: CareerPeriod
  private readonly role: string
  private readonly position: string | null
  private readonly teamSize: number | null
  private readonly description: string
  private readonly responsibilities: string[]
  private readonly technologies: CareerTechnologies

  constructor(props: CareerProjectProps) {
    this.title = props.title
    this.period = props.period
    this.role = props.role
    this.position = props.position
    this.teamSize = props.teamSize
    this.description = props.description
    this.responsibilities = props.responsibilities
    this.technologies = props.technologies
  }

  static fromJson(json: CareerProjectJson) {
    return new CareerProject({
      title: json.title,
      period: CareerPeriod.fromJson(json.period),
      role: json.role,
      position: json.position,
      teamSize: json.teamSize,
      description: json.description,
      responsibilities: json.responsibilities,
      technologies: CareerTechnologies.fromJson(json.technologies),
    })
  }

  getTitle() {
    return this.title
  }

  getPeriod() {
    return this.period
  }

  getRole() {
    return this.role
  }

  getPosition() {
    return this.position
  }

  getTeamSize() {
    return this.teamSize
  }

  getDescription() {
    return this.description
  }

  getResponsibilities() {
    return this.responsibilities
  }

  getTechnologyNames() {
    return this.technologies.getNames()
  }
}

type CareerCompanyProps = {
  company: string
  companyPeriod: CareerPeriod
  business: string
  projects: CareerProject[]
}

export class CareerCompany {
  private readonly company: string
  private readonly companyPeriod: CareerPeriod
  private readonly business: string
  private readonly projects: CareerProject[]

  constructor(props: CareerCompanyProps) {
    this.company = props.company
    this.companyPeriod = props.companyPeriod
    this.business = props.business
    this.projects = props.projects
  }

  static fromJson(json: CareerCompanyJson) {
    return new CareerCompany({
      company: json.company,
      companyPeriod: CareerPeriod.fromJson(json.companyPeriod),
      business: json.business,
      projects: json.projects.map(CareerProject.fromJson),
    })
  }

  getCompany() {
    return this.company
  }

  getCompanyPeriod() {
    return this.companyPeriod
  }

  getBusiness() {
    return this.business
  }

  getProjects() {
    return [...this.projects].sort((projectA, projectB) =>
      projectB.getPeriod().getStart().localeCompare(projectA.getPeriod().getStart()),
    )
  }
}

type CareerProfileProps = {
  timeline: CareerCompany[]
}

export class CareerProfile {
  private readonly timeline: CareerCompany[]

  constructor(props: CareerProfileProps) {
    this.timeline = props.timeline
  }

  static fromJson(json: CareerProfileJson) {
    return new CareerProfile({
      timeline: json.timeline.map(CareerCompany.fromJson),
    })
  }

  getTimeline() {
    return [...this.timeline].sort((companyA, companyB) =>
      companyB.getCompanyPeriod().getStart().localeCompare(companyA.getCompanyPeriod().getStart()),
    )
  }
}
