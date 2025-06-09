export interface Payload {
  type: 'partial' | 'full',
  textMatch: string,
  replaceText?: string,
}
