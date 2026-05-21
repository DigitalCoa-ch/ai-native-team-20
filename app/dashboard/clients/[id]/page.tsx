"use client";

import { useState, use } from "react";
import { clients as initialClients } from "../../../../lib/data";
import { Client } from "../../../../lib/types";
import Link from "next/link";

function riskLevel(i: number): "high" | "medium" | "low" {
  if (i >= 75) return "high";
  if (i >= 50) return "medium";
  return "low";
}

function riskPill(level: ReturnType<typeof riskLevel>) {
  const m = {
    high:  {bg:"rgba(248,113,113,0.12)",text:"#F87171",border:"rgba(248,113,113,0.3)",label:"High Risk"},
    medium:{bg:"rgba(251,146,60,0.12)",text:"#FB923C",border:"rgba(251,146,60,0.3)",label:"Medium Risk"},
    low:   {bg:"rgba(148,163,184,0.1)", text:"#94A3B8", border:"rgba(148,163,184,0.25)",label:"Low Risk"},
  }[level];
  return (
    <span style={{display:"inline-block",padding:"3px 10px",borderRadius:3,fontSize:10,fontWeight:700,letterSpacing:"0.08em",textTransform:"uppercase",backgroundColor:m.bg,color:m.text,border:`1px solid ${m.border}`}}>
      {m.label}
    </span>
  );
}

function fmtDate(d: string) {
  return new Date(d).toLocaleDateString("en-GB",{day:"2-digit",month:"short",year:"numeric"});
}

function txLabel(c: string) {
  const map: Record<string,string> = {streaming:"Streaming",overdraft:"Overdraft Fee",atm:"ATM Withdrawal",direct_debit:"Direct Debit",utility:"Utility",rent:"Rent Payment",grocery:"Grocery",transfer:"Transfer"};
  return map[c] ?? c;
}

export default function ClientDetailPage({params}: {params: Promise<{id:string}>}) {
  const {id} = use(params);
  const c = initialClients.find(x => x.id === id);
  if (!c) return <div style={{backgroundColor:"#0B1326",minHeight:"100vh",display:"flex",alignItems:"center",justifyContent:"center",color:"#475569",fontFamily:"var(--font-inter)"}}>Client not found.</div>;
  return <ClientDetail client={c} />;
}

function ClientDetail({client}: {client: Client}) {
  const [email, setEmail] = useState(client.draftEmail);
  const [status, setStatus] = useState<Client["status"]>(client.status);
  const scoreColor = client.stressIndex >= 75 ? "#F87171" : "#FB923C";
  const scoreGlow = client.stressIndex >= 75 ? "rgba(248,113,113,0.5)" : "rgba(251,146,60,0.5)";
  const approved = status === "approved";
  const rejected = status === "rejected";

  return (
    <div style={{minHeight:"100vh",backgroundColor:"#0B1326",fontFamily:"var(--font-inter)"}}>
      <header style={{backgroundColor:"#111827",borderBottom:"1px solid #1C253B",position:"sticky",top:0,zIndex:100}}>
        <div style={{maxWidth:1280,margin:"0 auto",padding:"0 32px",display:"flex",alignItems:"center",justifyContent:"space-between",height:60}}>
          <div style={{display:"flex",alignItems:"center",gap:12}}>
            <Link href="/dashboard" style={{display:"flex",alignItems:"center",gap:10,color:"#475569",fontSize:13,transition:"color 0.15s"}}
              onMouseEnter={e => ((e.currentTarget as HTMLAnchorElement).style.color = "#E2E8F0")}
              onMouseLeave={e => ((e.currentTarget as HTMLAnchorElement).style.color = "#475569")}>
              Back to Dashboard
            </Link>
            <div style={{width:1,height:20,backgroundColor:"#1C253B"}} />
            <div style={{display:"flex",alignItems:"center",gap:8}}>
              <div style={{width:28,height:28,borderRadius:5,background:"linear-gradient(135deg, #6366F1, #818CF8)",display:"flex",alignItems:"center",justifyContent:"center"}}>
                <span style={{color:"#fff",fontWeight:800,fontSize:10}}>AI</span>
              </div>
              <span style={{color:"#E2E8F0",fontWeight:700,fontSize:14}}>ClientAlert</span>
            </div>
          </div>
          <div>
            {status === "pending" && <div style={{padding:"4px 12px",borderRadius:4,fontSize:11,fontWeight:600,letterSpacing:"0.06em",textTransform:"uppercase",backgroundColor:"rgba(251,146,60,0.12)",color:"#FB923C",border:"1px solid rgba(251,146,60,0.3)"}}>Pending Review</div>}
            {status === "approved" && <div style={{padding:"4px 12px",borderRadius:4,fontSize:11,fontWeight:600,letterSpacing:"0.06em",textTransform:"uppercase",backgroundColor:"rgba(52,211,153,0.12)",color:"#34D399",border:"1px solid rgba(52,211,153,0.3)"}}>Approved</div>}
            {status === "rejected" && <div style={{padding:"4px 12px",borderRadius:4,fontSize:11,fontWeight:600,letterSpacing:"0.06em",textTransform:"uppercase",backgroundColor:"rgba(148,163,184,0.1)",color:"#94A3B8",border:"1px solid rgba(148,163,184,0.25)"}}>Rejected</div>}
          </div>
        </div>
      </header>

      <div style={{maxWidth:1280,margin:"0 auto",padding:"32px"}}>

        <div style={{backgroundColor:"#1C253B",border:"1px solid #334155",borderRadius:10,padding:"28px 32px",marginBottom:20,position:"relative",overflow:"hidden",boxShadow:"0 8px 32px rgba(0,0,0,0.6)"}}>
          <div style={{position:"absolute",top:0,left:0,right:0,height:3,background:"linear-gradient(90deg, #6366F1, #38BDF8)",opacity:0.8}} />
          <div style={{display:"flex",alignItems:"flex-start",justifyContent:"space-between",flexWrap:"wrap",gap:24}}>
            <div style={{display:"flex",alignItems:"center",gap:16}}>
              <div style={{width:56,height:56,borderRadius:8,background:"linear-gradient(135deg, rgba(99,102,241,0.25), rgba(99,102,241,0.05))",border:"1px solid rgba(99,102,241,0.3)",display:"flex",alignItems:"center",justifyContent:"center",fontSize:18,fontWeight:700,color:"#818CF8",letterSpacing:"0.05em"}}>
                {client.name.split(" ").map((n:string) => n[0]).join("")}
              </div>
              <div>
                <h1 style={{fontSize:22,fontWeight:700,color:"#E2E8F0",margin:0,letterSpacing:"-0.02em"}}>{client.name}</h1>
                <p style={{fontSize:13,color:"#475569",margin:"4px 0 0",fontFamily:"var(--font-mono)"}}>Account ****{client.accountNumber}</p>
                <div style={{marginTop:10,display:"flex",gap:8}}>{riskPill(riskLevel(client.stressIndex))}</div>
              </div>
            </div>
            <div style={{textAlign:"right"}}>
              <p style={{fontSize:10,fontWeight:600,color:"#475569",letterSpacing:"0.1em",textTransform:"uppercase",margin:"0 0 6px"}}>Stress Index</p>
              <p style={{fontSize:48,fontWeight:700,fontFamily:"var(--font-mono)",margin:0,lineHeight:1,letterSpacing:"-0.04em",color:scoreColor,textShadow:"0 0 20px "+scoreGlow}}>{client.stressIndex}</p>
              <div style={{height:6,width:120,backgroundColor:"rgba(51,65,85,0.6)",borderRadius:3,overflow:"hidden",margin:"8px 0 0",marginLeft:"auto"}}>
                <div style={{width:client.stressIndex+"%",height:"100%",backgroundColor:scoreColor,borderRadius:3,boxShadow:"0 0 8px "+scoreColor+"80"}} />
              </div>
              <p style={{fontSize:11,color:"#475569",margin:"6px 0 0",textAlign:"right"}}>{client.confidence}% confidence</p>
            </div>
          </div>
          <div style={{marginTop:20,padding:"12px 16px",backgroundColor:"rgba(248,113,113,0.07)",border:"1px solid rgba(248,113,113,0.2)",borderRadius:6}}>
            <p style={{fontSize:10,fontWeight:600,color:"#F87171",letterSpacing:"0.08em",textTransform:"uppercase",margin:"0 0 4px"}}>Alert Trigger</p>
            <p style={{fontSize:13,color:"#E2E8F0",margin:0,lineHeight:1.5}}>{client.trigger}</p>
          </div>
        </div>

        <div style={{display:"grid",gridTemplateColumns:"1fr 1.6fr",gap:20,alignItems:"start"}}>
          <div style={{display:"flex",flexDirection:"column",gap:20}}>
            <div style={{backgroundColor:"#1C253B",border:"1px solid #334155",borderRadius:10,overflow:"hidden",boxShadow:"0 8px 32px rgba(0,0,0,0.6)"}}>
              <div style={{padding:"14px 20px",backgroundColor:"#111827",borderBottom:"1px solid #1C253B"}}>
                <p style={{fontSize:10,fontWeight:600,color:"#475569",letterSpacing:"0.1em",textTransform:"uppercase",margin:0}}>Evidence - Recent Transactions</p>
              </div>
              {client.transactions.map((tx: any, i: number) => {
                const warn = /returned|declined|overdraft|fee/i.test(tx.description);
                return (
                  <div key={tx.id} style={{display:"flex",alignItems:"center",justifyContent:"space-between",padding:"14px 20px",borderBottom:i<client.transactions.length-1?"1px solid rgba(51,65,85,0.4)":"none",backgroundColor:warn?"rgba(248,113,113,0.04)":"transparent"}}>
                    <div style={{display:"flex",alignItems:"center",gap:12}}>
                      <div style={{width:36,height:36,borderRadius:6,backgroundColor:warn?"rgba(248,113,113,0.12)":"rgba(99,102,241,0.1)",border:`1px solid ${warn?"rgba(248,113,113,0.25)":"rgba(99,102,241,0.2)"}`,display:"flex",alignItems:"center",justifyContent:"center",fontSize:14}}>{warn?"⚠":"$"}</div>
                      <div>
                        <p style={{fontSize:13,fontWeight:600,color:warn?"#F87171":"#E2E8F0",margin:0}}>{tx.description}</p>
                        <p style={{fontSize:11,color:"#475569",margin:"2px 0 0"}}>{txLabel(tx.category)} - {fmtDate(tx.date)}</p>
                      </div>
                    </div>
                    <span style={{fontSize:14,fontWeight:700,fontFamily:"var(--font-mono)",color:warn?"#F87171":"#E2E8F0",letterSpacing:"-0.02em"}}>{(tx.amount<0?"-":"+")+"$"+Math.abs(tx.amount).toFixed(2)}</span>
                  </div>
                );
              })}
            </div>

            <div style={{backgroundColor:"#1C253B",border:"1px solid rgba(99,102,241,0.4)",borderRadius:10,padding:"20px",boxShadow:"0 0 20px rgba(99,102,241,0.15), 0 8px 32px rgba(0,0,0,0.6)"}}>
              <div style={{display:"flex",alignItems:"center",gap:8,marginBottom:14}}>
                <div style={{width:24,height:24,borderRadius:4,background:"linear-gradient(135deg, #6366F1, #818CF8)",display:"flex",alignItems:"center",justifyContent:"center"}}>
                  <span style={{color:"#fff",fontWeight:800,fontSize:9}}>AI</span>
                </div>
                <p style={{fontSize:10,fontWeight:600,color:"#6366F1",letterSpacing:"0.1em",textTransform:"uppercase",margin:0}}>Behavioral Summary</p>
              </div>
              <p style={{fontSize:13,color:"#94A3B8",lineHeight:1.7,margin:0}}>{client.summary}</p>
            </div>
          </div>

          <div>
            {status === "pending" ? (
              <div style={{backgroundColor:"#1C253B",border:"1px solid #334155",borderRadius:10,overflow:"hidden",boxShadow:"0 8px 32px rgba(0,0,0,0.6)"}}>
                <div style={{padding:"14px 20px",backgroundColor:"#111827",borderBottom:"1px solid #1C253B",display:"flex",alignItems:"center",justifyContent:"space-between"}}>
                  <p style={{fontSize:10,fontWeight:600,color:"#475569",letterSpacing:"0.1em",textTransform:"uppercase",margin:0}}>Draft Outreach Email</p>
                  <p style={{fontSize:10,color:"#334155",margin:0}}>Auto-saved</p>
                </div>
                <textarea value={email} onChange={(e: any) => setEmail(e.target.value)} style={{width:"100%",minHeight:320,padding:"20px",backgroundColor:"#111827",color:"#E2E8F0",border:"none",outline:"none",resize:"vertical",fontSize:13,fontFamily:"var(--font-inter)",lineHeight:1.7}} />
                <div style={{padding:"16px 20px",borderTop:"1px solid #1C253B",display:"flex",alignItems:"center",gap:12}}>
                  <button onClick={() => setStatus("approved")} style={{display:"inline-flex",alignItems:"center",gap:8,padding:"10px 24px",borderRadius:6,fontSize:13,fontWeight:600,color:"#ffffff",background:"linear-gradient(135deg, #6366F1, #4F46E5)",border:"none",boxShadow:"0 0 14px rgba(99,102,241,0.5)",cursor:"pointer"}}>Approve and Send Email</button>
                  <button onClick={() => setStatus("rejected")} style={{display:"inline-flex",alignItems:"center",gap:8,padding:"10px 20px",borderRadius:6,fontSize:13,fontWeight:600,color:"#94A3B8",backgroundColor:"transparent",border:"1px solid #334155",cursor:"pointer"}}>Reject Alert</button>
                </div>
              </div>
            ) : approved ? (
              <div style={{backgroundColor:"rgba(52,211,153,0.07)",border:"1px solid rgba(52,211,153,0.3)",borderRadius:10,padding:"48px 40px",textAlign:"center",boxShadow:"0 0 24px rgba(52,211,153,0.15), 0 8px 32px rgba(0,0,0,0.6)"}}>
                <div style={{width:64,height:64,borderRadius:32,background:"rgba(52,211,153,0.12)",border:"1px solid rgba(52,211,153,0.3)",display:"flex",alignItems:"center",justifyContent:"center",margin:"0 auto 20px"}}>
                  <span style={{fontSize:28,color:"#34D399"}}>✓</span>
                </div>
                <h2 style={{fontSize:20,fontWeight:700,color:"#34D399",margin:"0 0 10px"}}>Email Sent Successfully</h2>
                <p style={{fontSize:13,color:"#475569",margin:"0 0 24px",lineHeight:1.6}}>The outreach email for {client.name} has been approved and sent to the client. This action is logged for compliance records.</p>
                <Link href="/dashboard" style={{display : inline-flex,alignItems:center,gap:8,padding:10px 24px,borderRadius:6,fontSize:13,fontWeight:600,color:#34D399,backgroundColor:transparent,border:1px solid rgba(52,211,153,0.3),cursor:pointer}}>Return to Dashboard</Link>
              </div>
            ) : rejected ? (
              <div style={{backgroundColor:"rgba(148,163,184,0.07)",border:"1px solid rgba(148,163,184,0.25)",borderRadius:10,padding:"48px 40px",textAlign:"center",boxShadow:"0 8px 32px rgba(0,0,0,0.6)"}}>
                <div style={{width:64,height:64,borderRadius:32,background:"rgba(148,163,184,0.1)",border:"1px solid rgba(148,163,184,0.25)",display:"flex",alignItems:"center",justifyContent:"center",margin:"0 auto 20px"}}>
                  <span style={{fontSize:28,color:"#94A3B8"}}>✗</span>
                </div>
                <h2 style={{fontSize:20,fontWeight:700,color:"#94A3B8",margin:"0 0 10px"}}>Alert Rejected</h2>
                <p style={{fontSize:13,color:"#475569",margin:"0 0 24px",lineHeight:1.6}}>This alert has been dismissed. No outreach email will be sent to {client.name}.</p>
                <Link href="/dashboard" style={{display:"inline-flex",alignItems:"center",gap:8,padding:"10px 24px",borderRadius:6,fontSize:13,fontWeight:600,color:"#94A3B8",backgroundColor:"transparent",border:"1px solid #334155",cursor:"pointer"}}>Return to Dashboard</Link>
              </div>
            ) : null}
          </div>
        </div>
      </div>
    </div>
  );
}