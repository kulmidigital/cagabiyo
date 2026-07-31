/**
 * Email chrome.
 *
 * Layout comes from React Email's Row/Column/Button, which render the
 * presentation tables that Outlook needs — its Word rendering engine has no
 * flexbox or grid, so tables remain the only reliable layout in mail. Using the
 * library's primitives rather than hand-rolled <table> markup keeps that
 * requirement satisfied without web-oriented linters misreading it.
 */
import type { ReactNode } from 'react'
import {
  Body,
  Button,
  Column,
  Container,
  Head,
  Hr,
  Html,
  Img,
  Link,
  Preview,
  Row,
  Section,
  Text,
} from 'react-email'

import { brand, fontStack, LOGO_URL } from './theme'

/**
 * Shell shared by every template: ink header carrying the wordmark, white body,
 * ink footer. Layout is table-and-inline-style based because that is what email
 * clients reliably render.
 */
export function EmailLayout({
  preview,
  heading,
  eyebrow,
  children,
  footerNote,
}: Readonly<{
  preview: string
  heading: string
  eyebrow?: string
  children: ReactNode
  footerNote?: string
}>) {
  return (
    <Html lang="en">
      <Head />
      <Preview>{preview}</Preview>
      <Body
        style={{
          margin: 0,
          padding: '24px 12px',
          backgroundColor: brand.sand100,
          fontFamily: fontStack,
        }}
      >
        <Container
          style={{
            maxWidth: '600px',
            margin: '0 auto',
            backgroundColor: brand.white,
            border: `1px solid ${brand.border}`,
          }}
        >
          <Section
            style={{
              backgroundColor: brand.ink950,
              padding: '28px 32px',
            }}
          >
            <Img
              src={LOGO_URL}
              alt="CaliberCode"
              width="150"
              height="72"
              style={{ display: 'block', width: '150px', height: 'auto' }}
            />
          </Section>

          <Section style={{ padding: '32px' }}>
            {eyebrow ? (
              <Text
                style={{
                  margin: '0 0 12px',
                  fontSize: '11px',
                  fontWeight: 700,
                  letterSpacing: '0.16em',
                  textTransform: 'uppercase',
                  color: brand.signal600,
                }}
              >
                {eyebrow}
              </Text>
            ) : null}

            <Text
              style={{
                margin: '0 0 20px',
                fontSize: '22px',
                lineHeight: 1.3,
                fontWeight: 700,
                letterSpacing: '-0.02em',
                color: brand.ink900,
              }}
            >
              {heading}
            </Text>

            {children}
          </Section>

          <Hr style={{ margin: 0, borderColor: brand.border }} />

          <Section
            style={{ backgroundColor: brand.ink950, padding: '24px 32px' }}
          >
            {footerNote ? (
              <Text
                style={{
                  margin: '0 0 12px',
                  fontSize: '12px',
                  lineHeight: 1.6,
                  color: brand.ink200,
                }}
              >
                {footerNote}
              </Text>
            ) : null}
            <Text
              style={{
                margin: 0,
                fontSize: '11px',
                lineHeight: 1.6,
                color: brand.ink300,
              }}
            >
              CaliberCode Limited · Nairobi, Kenya
              <br />
              Advisory and professional training across East Africa
              <br />
              <Link
                href="https://calibercode.co.ke"
                style={{ color: brand.signal500, textDecoration: 'none' }}
              >
                calibercode.co.ke
              </Link>
            </Text>
          </Section>
        </Container>
      </Body>
    </Html>
  )
}

/** Body copy. */
export function Paragraph({
  children,
  muted = false,
}: Readonly<{ children: ReactNode; muted?: boolean }>) {
  return (
    <Text
      style={{
        margin: '0 0 16px',
        fontSize: '14px',
        lineHeight: 1.7,
        color: muted ? brand.muted : brand.ink800,
      }}
    >
      {children}
    </Text>
  )
}

/** Label/value rows — the workhorse of the internal notification templates. */
export function DetailTable({
  rows,
}: Readonly<{ rows: Array<{ label: string; value: string }> }>) {
  return (
    <Section
      style={{
        border: `1px solid ${brand.border}`,
        margin: '0 0 20px',
      }}
    >
      {rows.map((row, index) => {
        // Each Row is its own table, so the rule has to sit on the cells. The
        // last row skips it — otherwise it doubles up against the container
        // border and reads as a 2px line.
        const rule =
          index === rows.length - 1
            ? undefined
            : `1px solid ${brand.border}`

        return (
          <Row key={row.label}>
            <Column
              style={{
                width: '38%',
                padding: '10px 14px',
                borderBottom: rule,
                backgroundColor: brand.sand100,
                fontSize: '11px',
                fontWeight: 700,
                letterSpacing: '0.1em',
                textTransform: 'uppercase',
                color: brand.muted,
                verticalAlign: 'top',
              }}
            >
              {row.label}
            </Column>
            <Column
              style={{
                padding: '10px 14px',
                borderBottom: rule,
                fontSize: '14px',
                lineHeight: 1.6,
                color: brand.ink900,
              }}
            >
              {row.value}
            </Column>
          </Row>
        )
      })}
    </Section>
  )
}

/** Orange call-to-action. */
export function ActionButton({
  href,
  children,
}: Readonly<{ href: string; children: ReactNode }>) {
  return (
    <Button
      href={href}
      style={{
        backgroundColor: brand.signal500,
        padding: '12px 22px',
        fontSize: '12px',
        fontWeight: 700,
        letterSpacing: '0.12em',
        textTransform: 'uppercase',
        color: brand.ink950,
        textDecoration: 'none',
      }}
    >
      {children}
    </Button>
  )
}

/** Bulleted list rendered without relying on client list styling. */
export function BulletList({ items }: Readonly<{ items: Array<string> }>) {
  return (
    <Section style={{ margin: '0 0 20px' }}>
      {items.map((item) => (
        <Row key={item}>
          <Column
            style={{
              width: '16px',
              paddingRight: '10px',
              paddingBottom: '8px',
              fontSize: '14px',
              lineHeight: 1.7,
              color: brand.signal500,
              verticalAlign: 'top',
            }}
          >
            &bull;
          </Column>
          <Column
            style={{
              paddingBottom: '8px',
              fontSize: '14px',
              lineHeight: 1.7,
              color: brand.ink800,
            }}
          >
            {item}
          </Column>
        </Row>
      ))}
    </Section>
  )
}
