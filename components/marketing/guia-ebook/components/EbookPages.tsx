/**
 * EbookPages - Visual rendering component for ebook pages
 * Renders A4-sized pages with "Obsidian & Gold" design system
 */

import React from 'react';
import { Badge } from '@/components/ui/badge';
import { Symbol } from '@/components/ui/symbol';
import type { EbookData } from '../types';

interface EbookPagesProps {
  ebookData: EbookData;
  coverImageUrl: string | null;
  isPrint?: boolean;
}

// Design System Constants
const GOLD = '#C9B298';
const OBSIDIAN = '#050505';
const PAPER = '#FFFFFF';
const MARGIN = '12mm';

export const EbookPages: React.FC<EbookPagesProps> = ({
  ebookData,
  coverImageUrl,
  isPrint = false,
}) => {
  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        gap: isPrint ? '0' : '40px',
        backgroundColor: isPrint ? 'transparent' : '#111',
      }}
    >
      {/* 01: COVER PAGE */}
      <div
        className="al-page"
        style={{
          backgroundColor: OBSIDIAN,
          color: PAPER,
          padding: MARGIN,
          width: '210mm',
          height: '297mm',
          position: 'relative',
          display: 'flex',
          flexDirection: 'column',
          boxSizing: 'border-box',
          overflow: 'hidden',
        }}
      >
        <div
          style={{
            flex: 1,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            textAlign: 'center',
            border: `1px solid ${GOLD}33`,
            borderRadius: '4px',
          }}
        >
          <Symbol name="infinity" style={{ fontSize: '130px', color: GOLD, marginBottom: '25px' }} />
          <h1
            style={{
              fontSize: '46px',
              fontWeight: '900',
              textTransform: 'uppercase',
              letterSpacing: '-2px',
              marginBottom: '12px',
              padding: '0 15mm',
              lineHeight: '1',
            }}
          >
            {ebookData.title}
          </h1>
          <div style={{ height: '2px', width: '70px', backgroundColor: GOLD, marginBottom: '25px' }} />
          <p
            style={{
              fontSize: '18px',
              color: GOLD,
              textTransform: 'uppercase',
              letterSpacing: '9px',
              fontWeight: '300',
            }}
          >
            {ebookData.subtitle}
          </p>
          <div
            style={{
              marginTop: '55px',
              width: '255px',
              height: '340px',
              borderRadius: '4px',
              overflow: 'hidden',
              border: `1px solid ${GOLD}44`,
              boxShadow: '0 35px 70px rgba(0,0,0,0.6)',
            }}
          >
            {coverImageUrl && (
              <img
                src={coverImageUrl}
                style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                alt="Capa"
              />
            )}
          </div>
        </div>
      </div>

      {/* 02: TABLE OF CONTENTS */}
      <div
        className="al-page"
        style={{
          backgroundColor: PAPER,
          color: OBSIDIAN,
          padding: MARGIN,
          width: '210mm',
          height: '297mm',
          display: 'flex',
          flexDirection: 'column',
          boxSizing: 'border-box',
          overflow: 'hidden',
        }}
      >
        <div style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              borderBottom: `1px solid ${OBSIDIAN}15`,
              paddingBottom: '12px',
              marginBottom: '40px',
            }}
          >
            <div
              style={{
                display: 'flex',
                gap: '20px',
                fontSize: '9px',
                fontWeight: '900',
                textTransform: 'uppercase',
                letterSpacing: '1.5px',
                color: GOLD,
              }}
            >
              <span>Ref: AL-MANUAL-25</span>
              <span>Matriz de Conhecimento</span>
            </div>
            <span style={{ fontSize: '12px', fontWeight: 'bold', fontFamily: 'monospace' }}>PAGE_02</span>
          </div>

          <div style={{ marginBottom: '55px' }}>
            <h2
              style={{
                fontSize: '88px',
                fontWeight: '900',
                letterSpacing: '-7px',
                color: OBSIDIAN,
                lineHeight: '0.7',
                marginBottom: '12px',
              }}
            >
              Índice
            </h2>
            <div style={{ height: '4px', width: '65px', backgroundColor: GOLD }} />
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '130mm 1fr', gap: '15mm', flex: 1 }}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              {ebookData.summary.map((item, i) => (
                <div key={i} style={{ display: 'flex', alignItems: 'baseline', gap: '12px' }}>
                  <span
                    style={{
                      fontSize: '12px',
                      fontWeight: '900',
                      color: GOLD,
                      width: '25px',
                      fontFamily: 'monospace',
                    }}
                  >
                    {(i + 1).toString().padStart(2, '0')}
                  </span>
                  <div
                    style={{
                      flex: 1,
                      display: 'flex',
                      alignItems: 'baseline',
                      borderBottom: `1px solid ${OBSIDIAN}08`,
                      paddingBottom: '10px',
                    }}
                  >
                    <span
                      style={{
                        fontSize: '16px',
                        fontWeight: '800',
                        textTransform: 'uppercase',
                        letterSpacing: '0.5px',
                      }}
                    >
                      {item.chapter}
                    </span>
                    <div
                      style={{
                        flex: 1,
                        borderBottom: `1px dotted ${OBSIDIAN}30`,
                        margin: '0 12px',
                        position: 'relative',
                        bottom: '4px',
                      }}
                    />
                    <span
                      style={{
                        fontSize: '14px',
                        fontWeight: '900',
                        fontFamily: 'monospace',
                        color: GOLD,
                      }}
                    >
                      P.{item.page}
                    </span>
                  </div>
                </div>
              ))}
            </div>

            <div
              style={{
                borderLeft: `1px solid ${OBSIDIAN}10`,
                paddingLeft: '10mm',
                display: 'flex',
                flexDirection: 'column',
                gap: '30px',
              }}
            >
              <div>
                <h4
                  style={{
                    fontSize: '10px',
                    fontWeight: '900',
                    textTransform: 'uppercase',
                    color: GOLD,
                    letterSpacing: '2px',
                    marginBottom: '15px',
                  }}
                >
                  Fundação
                </h4>
                <p
                  style={{
                    fontSize: '11px',
                    lineHeight: '1.7',
                    color: '#555',
                    fontStyle: 'italic',
                    textAlign: 'justify',
                  }}
                >
                  Este guia é um organismo vivo de instrução técnica e reflexão estratégica, forjado
                  para preencher o gap entre o saber e o imortalizar.
                </p>
              </div>
              <div
                style={{
                  padding: '20px',
                  backgroundColor: OBSIDIAN,
                  color: PAPER,
                  borderRadius: '4px',
                }}
              >
                <h5
                  style={{
                    fontSize: '9px',
                    fontWeight: '900',
                    textTransform: 'uppercase',
                    color: GOLD,
                    marginBottom: '10px',
                    letterSpacing: '1px',
                  }}
                >
                  Instrução
                </h5>
                <p style={{ fontSize: '10px', opacity: 0.9, lineHeight: '1.5' }}>
                  Contemple as reflexões profundas ao final de cada página para expandir sua visão.
                </p>
              </div>
              <div style={{ marginTop: 'auto', textAlign: 'center', opacity: 0.08 }}>
                <Symbol name="infinity" style={{ fontSize: '70px' }} />
              </div>
            </div>
          </div>

          <div
            style={{
              borderTop: `1px solid ${OBSIDIAN}15`,
              paddingTop: '15px',
              marginTop: '20px',
              display: 'flex',
              justifyContent: 'space-between',
              fontSize: '9px',
              fontWeight: 'bold',
              color: '#AAA',
              textTransform: 'uppercase',
              letterSpacing: '2px',
            }}
          >
            <span>Academia Lendária / Design System v4.1</span>
            <span>© 2025</span>
          </div>
        </div>
      </div>

      {/* CHAPTERS AND SECTIONS */}
      {ebookData.chapters.map((chapter) => (
        <React.Fragment key={chapter.number}>
          {/* Chapter Title Page */}
          <div
            className="al-page"
            style={{
              backgroundColor: OBSIDIAN,
              color: PAPER,
              padding: MARGIN,
              width: '210mm',
              height: '297mm',
              display: 'flex',
              flexDirection: 'column',
              boxSizing: 'border-box',
              overflow: 'hidden',
            }}
          >
            <div style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
              <span
                style={{
                  fontSize: '260px',
                  fontWeight: '900',
                  color: `${GOLD}08`,
                  lineHeight: '0.6',
                  fontFamily: 'Inter',
                  marginLeft: '-30px',
                }}
              >
                {chapter.number}
              </span>
              <h2
                style={{
                  fontSize: '80px',
                  fontWeight: '900',
                  letterSpacing: '-4px',
                  marginTop: '-110px',
                  textTransform: 'uppercase',
                  lineHeight: '0.85',
                  maxWidth: '90%',
                }}
              >
                {chapter.title}
              </h2>
              <div style={{ height: '4px', width: '140px', backgroundColor: GOLD, marginTop: '30px' }} />
            </div>
          </div>

          {/* Section Pages */}
          {chapter.sections.map((section) => (
            <div
              key={section.id}
              className="al-page"
              style={{
                backgroundColor: PAPER,
                color: OBSIDIAN,
                padding: MARGIN,
                width: '210mm',
                height: '297mm',
                display: 'flex',
                flexDirection: 'column',
                boxSizing: 'border-box',
                overflow: 'hidden',
              }}
            >
              {/* Page Header */}
              <div
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  marginBottom: '25px',
                  alignItems: 'center',
                  borderBottom: '1px solid #F2F2F2',
                  paddingBottom: '12px',
                }}
              >
                <div style={{ display: 'flex', gap: '15px', alignItems: 'center' }}>
                  <Badge
                    style={{
                      backgroundColor: GOLD,
                      color: PAPER,
                      border: 'none',
                      padding: '4px 12px',
                      fontSize: '10px',
                      fontWeight: '900',
                      borderRadius: '2px',
                    }}
                  >
                    {section.id}
                  </Badge>
                  <span
                    style={{
                      fontSize: '10px',
                      fontWeight: '800',
                      textTransform: 'uppercase',
                      color: '#AAA',
                      letterSpacing: '2px',
                    }}
                  >
                    {chapter.title}
                  </span>
                </div>
                <span style={{ fontSize: '14px', fontWeight: '900', fontFamily: 'monospace', color: '#EEE' }}>
                  PAGE_0{section.pageNumber}
                </span>
              </div>

              <div
                style={{
                  flex: 1,
                  display: 'grid',
                  gridTemplateColumns: '118mm 62mm',
                  gap: '10mm',
                  overflow: 'hidden',
                }}
              >
                {/* LEFT COLUMN: Theory and Footer Blocks */}
                <div style={{ display: 'flex', flexDirection: 'column', height: '100%', overflow: 'hidden' }}>
                  {/* Theory Zone */}
                  <div style={{ flexShrink: 1, overflow: 'hidden', marginBottom: '30px' }}>
                    <h3
                      style={{
                        fontSize: '34px',
                        fontWeight: '900',
                        lineHeight: '0.9',
                        marginBottom: '20px',
                        letterSpacing: '-1.5px',
                        textTransform: 'uppercase',
                        color: '#000',
                      }}
                    >
                      {section.title}
                    </h3>
                    <div
                      style={{
                        fontSize: '13.5px',
                        lineHeight: '1.65',
                        textAlign: 'justify',
                        fontFamily: 'Source Serif 4, serif',
                        color: '#111',
                      }}
                    >
                      {section.content.split('\n\n').slice(0, 3).map((p, pi) => (
                        <p key={pi} style={{ marginBottom: '14px', position: 'relative' }}>
                          {pi === 0 && (
                            <span
                              style={{
                                float: 'left',
                                fontSize: '40px',
                                lineHeight: '0.8',
                                fontWeight: '900',
                                marginRight: '8px',
                                marginTop: '4px',
                                color: GOLD,
                              }}
                            >
                              {p.charAt(0)}
                            </span>
                          )}
                          {pi === 0 ? p.substring(1) : p}
                        </p>
                      ))}
                    </div>
                  </div>

                  {/* Practical Zone: Anchored at bottom */}
                  <div style={{ marginTop: 'auto', display: 'flex', flexDirection: 'column', gap: '20px' }}>
                    {/* Deep Reflection */}
                    <div
                      style={{
                        flexShrink: 0,
                        padding: '24px',
                        backgroundColor: '#F9F9F9',
                        border: '1px solid #EEE',
                        borderRadius: '4px',
                        position: 'relative',
                      }}
                    >
                      <div
                        style={{
                          position: 'absolute',
                          top: '-10px',
                          left: '20px',
                          backgroundColor: GOLD,
                          color: PAPER,
                          fontSize: '8px',
                          padding: '3px 12px',
                          fontWeight: '900',
                          letterSpacing: '1px',
                          borderRadius: '2px',
                        }}
                      >
                        REFLEXÃO_PROFUNDA
                      </div>
                      <div
                        style={{
                          fontSize: '12.5px',
                          color: '#222',
                          fontStyle: 'italic',
                          lineHeight: '1.6',
                          borderLeft: `4px solid ${GOLD}66`,
                          paddingLeft: '18px',
                          fontFamily: 'Source Serif 4, serif',
                        }}
                      >
                        "{section.script}"
                      </div>
                    </div>

                    {/* Ideas Matrix */}
                    <div
                      style={{
                        flexShrink: 0,
                        display: 'grid',
                        gridTemplateColumns: 'repeat(4, 1fr)',
                        gap: '8px',
                        marginBottom: '10px',
                      }}
                    >
                      {section.ideas.slice(0, 4).map((idea, ii) => (
                        <div
                          key={ii}
                          style={{
                            padding: '12px 8px',
                            border: '1px solid #F0F0F0',
                            borderRadius: '3px',
                            textAlign: 'center',
                            backgroundColor: '#FCFCFC',
                          }}
                        >
                          <span
                            style={{
                              fontSize: '7px',
                              color: '#CCC',
                              textTransform: 'uppercase',
                              display: 'block',
                              marginBottom: '4px',
                              fontWeight: '900',
                            }}
                          >
                            Variação {ii + 1}
                          </span>
                          <p
                            style={{
                              fontSize: '8.5px',
                              fontWeight: '800',
                              color: '#444',
                              lineHeight: '1.2',
                              textTransform: 'uppercase',
                            }}
                          >
                            {idea}
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* RIGHT COLUMN: Sidebar (Checklist) */}
                <div
                  style={{
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '15px',
                    borderLeft: '1px solid #F2F2F2',
                    paddingLeft: '8mm',
                    overflow: 'hidden',
                  }}
                >
                  <div
                    style={{
                      backgroundColor: OBSIDIAN,
                      color: PAPER,
                      padding: '20px',
                      borderRadius: '4px',
                      position: 'relative',
                      flexShrink: 0,
                    }}
                  >
                    <div
                      style={{
                        position: 'absolute',
                        top: '-10px',
                        left: '15px',
                        backgroundColor: GOLD,
                        color: PAPER,
                        fontSize: '8px',
                        padding: '3px 10px',
                        fontWeight: '900',
                        letterSpacing: '1px',
                      }}
                    >
                      PRO_INSIGHT
                    </div>
                    <p
                      style={{
                        fontSize: '12.5px',
                        lineHeight: '1.4',
                        margin: 0,
                        opacity: 0.95,
                        fontStyle: 'italic',
                        fontWeight: '300',
                      }}
                    >
                      {section.insight}
                    </p>
                  </div>

                  {/* 8-Step Checklist */}
                  <div
                    style={{
                      padding: '22px',
                      border: '1px solid #F2F2F2',
                      borderRadius: '4px',
                      flex: 1,
                      backgroundColor: '#FCFCFC',
                      overflow: 'hidden',
                    }}
                  >
                    <h4
                      style={{
                        fontSize: '10.5px',
                        fontWeight: '900',
                        textTransform: 'uppercase',
                        marginBottom: '20px',
                        color: '#000',
                        borderBottom: `2px solid ${GOLD}`,
                        width: 'fit-content',
                        paddingBottom: '4px',
                        letterSpacing: '1.5px',
                      }}
                    >
                      Plano de Execução
                    </h4>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
                      {section.checklist.slice(0, 8).map((item, ci) => (
                        <div key={ci} style={{ display: 'flex', gap: '12px', alignItems: 'start' }}>
                          <div
                            style={{
                              width: '13px',
                              height: '13px',
                              border: `1.5px solid ${GOLD}`,
                              borderRadius: '1px',
                              marginTop: '2px',
                              flexShrink: 0,
                            }}
                          />
                          <span style={{ fontSize: '10.5px', fontWeight: '600', color: '#333', lineHeight: '1.3' }}>
                            {item}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div style={{ padding: '16px', backgroundColor: '#F8F8F8', borderRadius: '2px', flexShrink: 0 }}>
                    {section.technicalSpec.slice(0, 4).map((spec, si) => (
                      <div
                        key={si}
                        style={{
                          display: 'flex',
                          justifyContent: 'space-between',
                          borderBottom:
                            si === section.technicalSpec.length - 1 ? 'none' : '1px solid #EEE',
                          padding: '8px 0',
                          width: '100%',
                        }}
                      >
                        <span
                          style={{
                            fontSize: '9px',
                            fontWeight: 'bold',
                            color: '#AAA',
                            textTransform: 'uppercase',
                            letterSpacing: '0.5px',
                          }}
                        >
                          {spec.label}
                        </span>
                        <span
                          style={{
                            fontSize: '9px',
                            fontWeight: '900',
                            fontFamily: 'monospace',
                            color: GOLD,
                          }}
                        >
                          {spec.value}
                        </span>
                      </div>
                    ))}
                  </div>

                  <div style={{ marginTop: 'auto', textAlign: 'center', opacity: 0.04, paddingBottom: '5px' }}>
                    <Symbol name="infinity" style={{ fontSize: '55px' }} />
                  </div>
                </div>
              </div>

              {/* Fixed Footer - Institutional */}
              <div
                style={{
                  fontSize: '9px',
                  color: '#AAA',
                  borderTop: '1px solid #F2F2F2',
                  padding: '14px 0',
                  marginTop: '10px',
                  display: 'flex',
                  justifyContent: 'space-between',
                  fontFamily: 'monospace',
                  letterSpacing: '2px',
                }}
              >
                <span>{ebookData.footerText}</span>
                <span className="font-bold">ACADEMIA LENDÁRIA | DEP. ENGENHARIA OBSIDIAN © 2025</span>
              </div>
            </div>
          ))}
        </React.Fragment>
      ))}

      {/* CONCLUSION PAGE */}
      <div
        className="al-page"
        style={{
          backgroundColor: PAPER,
          color: OBSIDIAN,
          padding: MARGIN,
          width: '210mm',
          height: '297mm',
          display: 'flex',
          flexDirection: 'column',
          boxSizing: 'border-box',
          overflow: 'hidden',
        }}
      >
        <div
          style={{
            flex: 1,
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            textAlign: 'center',
            border: '1px solid #EEE',
            margin: '15mm',
            padding: '35mm',
          }}
        >
          <div
            style={{
              display: 'inline-block',
              backgroundColor: GOLD,
              color: PAPER,
              padding: '10px 25px',
              borderRadius: '1px',
              fontSize: '12px',
              fontWeight: '900',
              textTransform: 'uppercase',
              margin: '0 auto 40px auto',
              letterSpacing: '3px',
            }}
          >
            Encerramento Técnico
          </div>
          <h2
            style={{
              fontSize: '68px',
              fontWeight: '900',
              lineHeight: '0.9',
              marginBottom: '40px',
              letterSpacing: '-4px',
              textTransform: 'uppercase',
            }}
          >
            {ebookData.conclusion.title}
          </h2>
          <div
            style={{
              fontSize: '20px',
              lineHeight: '1.7',
              color: '#333',
              fontStyle: 'italic',
              fontFamily: 'Source Serif 4, serif',
              maxWidth: '90%',
              margin: '0 auto',
            }}
          >
            {ebookData.conclusion.content}
          </div>
        </div>
      </div>
    </div>
  );
};

export default EbookPages;
