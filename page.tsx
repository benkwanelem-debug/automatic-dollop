"use client"

import { useEffect, useState, type ChangeEvent } from "react"

export default function Page() {
  const [activeTab, setActiveTab] = useState("overview")
  const [bankName, setBankName] = useState("")
  const [businessName, setBusinessName] = useState("")
  const [accHolder, setAccHolder] = useState("")
  const [accNumber, setAccNumber] = useState("")
  const [branchCode, setBranchCode] = useState("")
  const [bankPhone, setBankPhone] = useState("")
  const [withdrawAmount, setWithdrawAmount] = useState("")
  const [oliveName, setOliveName] = useState("Lerato")
  const [olivePhone, setOlivePhone] = useState("071 234 5678")
  const [payoutMethod, setPayoutMethod] = useState("")
  const [payoutAccount, setPayoutAccount] = useState("")
  const [downloadEnabled, setDownloadEnabled] = useState(false)
  const [allowedUsers, setAllowedUsers] = useState<string[]>([])
  const [videoFileName, setVideoFileName] = useState("Lerato Dance.mp4")

  useEffect(() => {
    const onContextMenu = (event: MouseEvent) => {
      event.preventDefault()
      return false
    }

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "PrintScreen" || (event.ctrlKey && event.shiftKey && event.key === "S")) {
        event.preventDefault()
        const blackScreen = document.getElementById("blackScreen")
        if (blackScreen) blackScreen.style.display = "flex"
        sendSafetyAlert("Sipho - 071***123", videoFileName)
        window.setTimeout(() => {
          if (blackScreen) blackScreen.style.display = "none"
        }, 3000)
      }
    }

    document.addEventListener("contextmenu", onContextMenu)
    document.addEventListener("keydown", onKeyDown)

    const watermarkTimer = window.setInterval(() => {
      const watermark = document.getElementById("videoWatermark")
      if (watermark) {
        watermark.style.left = `${Math.random() * 60}%`
        watermark.style.top = `${Math.random() * 70}%`
      }
    }, 3000)

    return () => {
      document.removeEventListener("contextmenu", onContextMenu)
      document.removeEventListener("keydown", onKeyDown)
      window.clearInterval(watermarkTimer)
    }
  }, [videoFileName])

  const openTab = (id: string) => setActiveTab(id)

  const saveBusiness = () => {
    if (!businessName || !bankName || bankName.includes("Select")) {
      alert("⚠️ Faka Igama le App ne Bank!")
      return
    }

    alert(`✅ Business Saved!\nApp: ${businessName}\nBank: ${bankName}\n💸 Payout izongena!`)
  }

  const addOlive = () => {
    if (!payoutMethod || payoutMethod.includes("Select")) {
      alert("⚠️ Khetha i-Payout Method!")
      return
    }

    alert(`✅ Olive Added!\nIgama: ${oliveName}\nPayout: ${payoutMethod}`)
  }

  const toggleDownload = (checked: boolean) => {
    setDownloadEnabled(checked)
  }

  const approveDownload = (name: string) => {
    setAllowedUsers((current) => {
      if (current.includes(name)) return current
      return [...current, name]
    })

    const statusId = `${name.toLowerCase()}Status`
    const declineId = `${name.toLowerCase()}Decline`

    const statusEl = document.getElementById(statusId)
    const declineEl = document.getElementById(declineId)
    if (statusEl) statusEl.style.display = "block"
    if (declineEl) declineEl.style.display = "none"

    alert(`✅ Lerato uvumele ${name}!\nUma ethi CHA kwabanye - Ihlala ivaliwe kubo!`)
  }

  const declineDownload = (name: string) => {
    setAllowedUsers((current) => current.filter((user) => user !== name))

    const statusId = `${name.toLowerCase()}Status`
    const declineId = `${name.toLowerCase()}Decline`

    const statusEl = document.getElementById(statusId)
    const declineEl = document.getElementById(declineId)
    if (statusEl) statusEl.style.display = "none"
    if (declineEl) declineEl.style.display = "block"

    alert(`❌ Lerato uthi CHA - Angimvuleli ${name}!\n${name} - Angeke adownloade - Ivaliwe kuye - Osisi Uphephile!`)
  }

  const uploadVideo = () => {
    alert(`✅ Video Uploaded!\nDownload: ${downloadEnabled ? "ON" : "OFF - Lerato Unquma - Uma ethi CHA - Ivaliwe"}\n🛡️ Safety Alert Active - Osisi Baphephile!`)
  }

  const requestDownload = () => {
    if (downloadEnabled) {
      alert("⬇️ Downloading...")
      return
    }

    alert("📩 Request Sent to Lerato! Uma ethi CHA - Angeke ukwazi ukudownload-a - Osisi Uphephile!")
  }

  const sendSafetyAlert = (viewerName: string, videoName: string) => {
    const sisiPhone = "27712345678"
    const message = `🚨 ISANGO VAULT SAFETY ALERT 🚨%0A%0AOsisi uLerato - Umuntu uzamile ukwephula!%0A%0A👤 Viewer: ${viewerName}%0A🎥 Video: ${videoName}%0A⏰ Isikhathi: ${new Date().toLocaleString()}`
    const waLink = `https://wa.me/${sisiPhone}?text=${message}`

    alert(`🚨 SAFETY ALERT - Osisi Uphephile! 🚨\n\n${viewerName} uzamile ukurecorder "${videoName}"\nIsivikelo sisebenzile - I-video ibe mnyama!`)
    window.open(waLink, "_blank")

    const log = document.getElementById("safetyLog")
    if (log) {
      log.innerHTML += `<div style="border:1px solid red;padding:6px;border-radius:6px;margin-top:6px;background:#200;font-size:11px">🚨 ${new Date().toLocaleTimeString()} - ${viewerName} - Uzamile ukurecorder ${videoName}</div>`
    }
  }

  const handleVideoUpload = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file) {
      setVideoFileName(file.name)
    }
  }

  return (
    <>
      <style>{`
        * { box-sizing: border-box; }
        body { background: #000; color: #fff; font-family: Arial, sans-serif; margin: 0; padding: 10px; }
        h2 { color: gold; text-align: center; margin: 10px 0; }
        .tabs { display: flex; gap: 6px; overflow-x: auto; padding-bottom: 10px; }
        .tab { border: 1px solid gold; padding: 10px 14px; border-radius: 20px; white-space: nowrap; background: #111; color: gold; cursor: pointer; font-size: 13px; }
        .tab.active { background: gold; color: #000; font-weight: bold; }
        .card { border: 1px solid gold; border-radius: 14px; padding: 16px; margin-bottom: 16px; background: #111; display: none; }
        .card.active { display: block; }
        label { color: gold; font-weight: bold; display: block; margin: 14px 0 6px 0; font-size: 14px; }
        input, select { width: 100%; padding: 14px; border: 1px solid gold; border-radius: 10px; background: #000; color: #fff; display: block; margin-bottom: 4px; }
        button { width: 100%; padding: 15px; background: gold; color: #000; font-weight: bold; border: none; border-radius: 12px; margin-top: 18px; font-size: 16px; cursor: pointer; }
        .header { display: flex; justify-content: space-between; align-items: center; border: 1px solid gold; border-radius: 10px; padding: 8px 12px; margin-bottom: 12px; }
        .stat { display: flex; justify-content: space-between; border-bottom: 1px dashed #333; padding: 10px 0; font-size: 14px; }
        .bankbox { border: 1px dashed gold; padding: 12px; border-radius: 12px; margin-top: 12px; background: #0a0a0a; }
        .videoWrap { position: relative; background: #000; border: 1px solid gold; border-radius: 12px; overflow: hidden; margin-top: 12px; }
        .watermark { position: absolute; top: 10px; left: 10px; color: rgba(255, 215, 0, 0.35); font-size: 11px; pointer-events: none; user-select: none; z-index: 2; font-weight: bold; }
        .blackScreen { position: absolute; top: 0; left: 0; width: 100%; height: 100%; background: #000; display: none; justify-content: center; align-items: center; z-index: 10; text-align: center; }
        .toggleBox { border: 1px solid gold; border-radius: 10px; padding: 12px; margin: 12px 0; background: #000; display: flex; justify-content: space-between; align-items: center; }
        .switch { position: relative; display: inline-block; width: 50px; height: 28px; margin: 0; }
        .switch input { opacity: 0; width: 0; height: 0; }
        .slider { position: absolute; cursor: pointer; top: 0; left: 0; right: 0; bottom: 0; background: #333; border: 1px solid gold; border-radius: 20px; transition: 0.3s; }
        .dot { position: absolute; height: 20px; width: 20px; left: 4px; bottom: 3px; background: #888; border-radius: 50%; transition: 0.3s; z-index: 3; }
        .statusText { font-size: 12px; color: #888; margin: 4px 0 0 0; }
        .row { display: flex; justify-content: space-between; align-items: center; }
        .miniBtn { width: auto; padding: 8px 15px; font-size: 13px; background: #111; color: gold; border: 1px solid gold; margin-top: 8px; }
      `}</style>

      <main style={{ maxWidth: 520, margin: "0 auto", padding: 8 }}>
        <h2>Isango Vault OTT</h2>

        <div className="tabs">
          <div className={`tab ${activeTab === "overview" ? "active" : ""}`} onClick={() => openTab("overview")}>📊 Overview</div>
          <div className={`tab ${activeTab === "business" ? "active" : ""}`} onClick={() => openTab("business")}>💼 Business</div>
          <div className={`tab ${activeTab === "creator" ? "active" : ""}`} onClick={() => openTab("creator")}>🫒 Olive + Link + QR</div>
          <div className={`tab ${activeTab === "video" ? "active" : ""}`} onClick={() => openTab("video")}>🎥 Video+Live</div>
        </div>

        <div id="overview" className={`card ${activeTab === "overview" ? "active" : ""}`}>
          <div className="header">
            <b>📊 Overview</b>
            <span style={{ border: "1px solid gold", padding: "2px 8px", borderRadius: 10, fontSize: 11, color: "gold" }}>Live v2.1</span>
          </div>
          <div className="stat"><span>Total Olives</span><span>12</span></div>
          <div className="stat"><span>Total Earnings</span><span>R 4,250</span></div>
          <div className="stat"><span>Pending Payouts</span><span>R 890</span></div>
          <div className="stat"><span>Today Views</span><span>1,432</span></div>
          <div className="stat"><span>🛡️ SA 18+ Verified - Osisi Baphephile 24/7</span><span>Secure</span></div>
        </div>

        <div id="business" className={`card ${activeTab === "business" ? "active" : ""}`}>
          <div className="header">
            <b>💼 Business / Withdraw</b>
            <span style={{ border: "1px solid gold", padding: "2px 8px", borderRadius: 10, fontSize: 11, color: "gold" }}>Secure</span>
          </div>
          <label>🏢 Igama le App / Business Name</label>
          <input id="appName" value={businessName} onChange={(e) => setBusinessName(e.target.value)} placeholder="Isango Vault - Lerato" />
          <label>Balance Yakho</label>
          <input value="R 4,250 - Available" disabled />

          <div className="bankbox">
            <b style={{ color: "gold" }}>🏦 Bank Details - For Payout</b>
            <label>Bank Name</label>
            <select value={bankName} onChange={(e) => setBankName(e.target.value)}>
              <option value="">Select bank —</option>
              <option>TymeBank</option>
              <option>Capitec</option>
              <option>FNB</option>
              <option>ABSA</option>
              <option>Standard Bank</option>
              <option>Nedbank</option>
            </select>
            <label>Account Holder Name</label>
            <input value={accHolder} onChange={(e) => setAccHolder(e.target.value)} placeholder="Lerato Dlamini" />
            <label>Account Number</label>
            <input value={accNumber} onChange={(e) => setAccNumber(e.target.value)} placeholder="1234567890" />
            <label>Branch Code (Optional)</label>
            <input value={branchCode} onChange={(e) => setBranchCode(e.target.value)} placeholder="250655" />
            <label>Phone Linked to Bank / eWallet</label>
            <input value={bankPhone} onChange={(e) => setBankPhone(e.target.value)} placeholder="071 234 5678" />
          </div>

          <label>Amount to Withdraw</label>
          <input value={withdrawAmount} onChange={(e) => setWithdrawAmount(e.target.value)} placeholder="R 500" />
          <button onClick={saveBusiness}>💾 Save Business + Request Withdraw</button>
        </div>

        <div id="creator" className={`card ${activeTab === "creator" ? "active" : ""}`}>
          <div className="header">
            <b>🫒 Olive + Link + QR Form</b>
            <span style={{ border: "1px solid gold", padding: "2px 8px", borderRadius: 10, fontSize: 11, color: "gold" }}>Improved v2.1</span>
          </div>

          <label>Igama le Olive</label>
          <input value={oliveName} onChange={(e) => setOliveName(e.target.value)} placeholder="Lerato" />
          <label>Phone</label>
          <input value={olivePhone} onChange={(e) => setOlivePhone(e.target.value)} placeholder="071 234 5678" />

          <div className="bankbox">
            <label>💰 Payout Method</label>
            <select value={payoutMethod} onChange={(e) => setPayoutMethod(e.target.value)}>
              <option value="">Select payout method —</option>
              <option>TymeBank</option>
              <option>Capitec</option>
              <option>FNB</option>
              <option>ABSA</option>
              <option>Instant Money (Pick n Pay / Shoprite)</option>
              <option>CashSend</option>
            </select>
            <label>🏦 Account / Phone for Payout</label>
            <input value={payoutAccount} onChange={(e) => setPayoutAccount(e.target.value)} placeholder="Enter account number or phone for payout" />
          </div>

          <button onClick={addOlive}>+ Add Olive + Link + QR</button>
        </div>

        <div id="video" className={`card ${activeTab === "video" ? "active" : ""}`}>
          <div className="header">
            <b>🎥 Video + Live</b>
            <span style={{ border: "1px solid gold", padding: "2px 8px", borderRadius: 10, fontSize: 11, color: "gold" }}>DRM Protected - Osisi Safe</span>
          </div>

          <label>Upload Video (OTT)</label>
          <input type="file" id="videoUpload" onChange={handleVideoUpload} />

          <div className="videoWrap">
            <video id="protectedVideo" controls controlsList="nodownload noremoteplayback" disablePictureInPicture style={{ width: "100%", background: "#000" }}>
              <source src="" type="video/mp4" />
            </video>
            <div className="watermark" id="videoWatermark">Isango Vault - Lerato - 071****678 - ID: #8842</div>
            <div className="blackScreen" id="blackScreen">
              <div>
                <p style={{ color: "gold", fontWeight: "bold", margin: 0 }}>🔒 Screen Recording Blocked</p>
                <p style={{ fontSize: 11, color: "#888", margin: "5px 0 0 0" }}>Protected - Osisi Upho... Safety Triggered</p>
              </div>
            </div>
          </div>

          <p style={{ fontSize: 11, color: "#888", margin: "6px 0" }}>🛡️ Protected: No Download • No Screen Record • Watermarked • Safety Alert</p>

          <div className="toggleBox">
            <div>
              <b style={{ color: "gold", fontSize: 14 }}>⬇️ Download Permission</b>
              <p className="statusText" id="downloadStatus" style={{ color: downloadEnabled ? "gold" : "#888" }}>
                {downloadEnabled ? "ON - Anyone can download - Wonke angadownload-a" : "OFF - Viewers must request - Lerato Unquma"}
              </p>
            </div>
            <label className="switch">
              <input type="checkbox" checked={downloadEnabled} onChange={(e) => toggleDownload(e.target.checked)} />
              <span className="slider" />
              <span className="dot" id="toggleDot" style={{ transform: downloadEnabled ? "translateX(22px)" : "translateX(0)", background: downloadEnabled ? "gold" : "#888" }} />
            </label>
          </div>

          <div id="permissionRequests" style={{ border: "1px dashed gold", padding: 10, borderRadius: 10, display: "block", background: "#0a0a0a" }}>
            <b style={{ color: "gold", fontSize: 13 }}>📩 Download Requests - Umnikazi (Lerato) Unquma</b>
            <p style={{ fontSize: 11, color: "#888", margin: "4px 0 8px 0" }}>Uma uLerato ethi CHA - Ivaliwe - Ku Sipho - Angeke adownloade</p>

            <div style={{ border: "1px solid #333", borderRadius: 8, padding: 8, marginBottom: 8, background: "#111" }}>
              <div className="row">
                <div>
                  <b style={{ fontSize: 13 }}>Sipho - 071***123</b><br />
                  <span style={{ fontSize: 11, color: "#888" }}>Cela ukudownload-a: "Lerato Dlamini"</span>
                </div>
                <button
                  style={{ width: "auto", padding: "8px 12px", marginTop: 0, fontSize: 11, marginRight: 6 }}
                  onClick={() => approveDownload("Sipho")}
                >
                  Allow
                </button>
                <button
                  style={{ width: "auto", padding: "8px 12px", marginTop: 0, fontSize: 11, background: "#333", color: "#fff" }}
                  onClick={() => declineDownload("Sipho")}
                >
                  Decline
                </button>
              </div>
              <div id="siphoStatus" style={{ fontSize: 11, color: "gold", display: allowedUsers.includes("Sipho") ? "block" : "none", marginTop: 6 }}>✅ Sipho - Unemvume - Kuphela yena!</div>
              <div id="siphoDecline" style={{ fontSize: 11, color: "red", display: "none", marginTop: 6 }}>❌ Cha - Angimvuleli Sipho - Ivaliwe kuye!</div>
            </div>

            <div style={{ border: "1px solid #333", borderRadius: 8, padding: 8, marginBottom: 8, background: "#111" }}>
              <div className="row">
                <div>
                  <b style={{ fontSize: 13 }}>Thandi - 082***456</b><br />
                  <span style={{ fontSize: 11, color: "#888" }}>Cela ukudownload-a: "Lerato Dlamini"</span>
                </div>
                <button
                  style={{ width: "auto", padding: "8px 12px", marginTop: 0, fontSize: 11, marginRight: 6 }}
                  onClick={() => approveDownload("Thandi")}
                >
                  Allow
                </button>
                <button
                  style={{ width: "auto", padding: "8px 12px", marginTop: 0, fontSize: 11, background: "#333", color: "#fff" }}
                  onClick={() => declineDownload("Thandi")}
                >
                  Decline
                </button>
              </div>
              <div id="thandiStatus" style={{ fontSize: 11, color: "gold", display: allowedUsers.includes("Thandi") ? "block" : "none", marginTop: 6 }}>✅ Thandi - Unemvume - Kuphela yena!</div>
              <div id="thandiDecline" style={{ fontSize: 11, color: "red", display: "none", marginTop: 6 }}>❌ Cha - Angimvuleli Thandi - Ivaliwe kuye!</div>
            </div>

            <div style={{ border: "1px solid gold", borderRadius: 8, padding: 8, marginTop: 10, background: "#000" }}>
              <b style={{ color: "gold", fontSize: 12 }}>🔓 Bantu Abavunyelwe Ukudownload-a (Allowed List):</b>
              <div id="allowedList" style={{ fontSize: 12, marginTop: 6, color: "#fff" }}>
                {allowedUsers.length === 0
                  ? "- Akekho okwamanje - Uma i-OFF - Kumele bacele - Uma uLerato ethi CHA - Ivaliwe!"
                  : allowedUsers.map((user) => `✅ ${user} - Unemvume - Kuphela yena`).join("<br>")}
              </div>
            </div>
          </div>

          <button onClick={uploadVideo}>⬆️ Upload Video</button>

          <div style={{ border: "1px solid #333", borderRadius: 10, padding: 10, marginTop: 12 }}>
            <b style={{ fontSize: 13 }}>👀 Viewer View:</b><br />
            <button className="miniBtn" onClick={requestDownload}>🔒 Request to Download - Cela Imvume ku Lerato</button>
          </div>

          <div id="safetyLog" style={{ border: "1px solid red", borderRadius: 10, padding: 10, marginTop: 12, background: "#0a0000" }}>
            <b style={{ color: "red", fontSize: 12 }}>🛡️ Safety Log - Osisi Baphephile 24/7</b>
            <div style={{ fontSize: 11, color: "#888", marginTop: 6 }}>Uma kukhona ozama ukurecorder - Kuzovela lapha - Futhi uSisi uzothola i-WhatsApp Alert</div>
          </div>

          <button style={{ background: "red", color: "white", marginTop: 15 }} onClick={() => alert("🔴 Live Started! Link: isango.vault/live/Lerato")}>🔴 Start Live Stream</button>
        </div>
      </main>
    </>
  )
}



































































































