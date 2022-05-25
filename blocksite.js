function kh({ siteBlockingMode: e }) {
    let t = Lt(Ma),
        n = $n(Jm),
        r = $n(e === "Allow" ? v0 : w0),
        a = Lt(Pm),
        [i, l] = (0, Xt.useState)(""),
        u = (m) => {
            l(m);
        },
        c = (m) => {
            if (m !== "Enter") return;
            let v = Pv(i);
            if (v.domain === null) return t(ue("settings_toast_error"));
            if (r.includes(v.hostname)) return t(ue("settings_toast_existed"));
            a([e, [...r, v.hostname]]), l("");
        },
        d = (m) => {
            let v = r.filter((p, x) => x !== m);
            a([e, v]);
        };
    return Xt.default.createElement(
        Xt.default.Fragment,
        null,
        n === "Started" &&
            Xt.default.createElement(
                XA,
                null,
                Xt.default.createElement(HA, { src: gx() }),
                Xt.default.createElement($A, null, ue("extension_cannot_edit"))
            ),
        Xt.default.createElement(
            BA,
            null,
            Xt.default.createElement(
                jA,
                null,
                (0, r5.default)(
                    ue("settings_blocklist_allowlist_description"),
                    "[%s]",
                    (m, v) =>
                        Xt.default.createElement(
                            t5,
                            { key: v },
                            e === "Allow"
                                ? ue("settings_allowlist_can")
                                : ue("settings_blocklist_cannot")
                        )
                )
            ),
            Xt.default.createElement(FA, null, ue("settings_mode_switch"))
        ),
        Xt.default.createElement(
            e5,
            { disabled: n === "Started" },
            Xt.default.createElement(KA, {
                placeholder: ue("settings_newblackbox_placeholder"),
                value: i,
                onChange: ({ target: m }) => u(m.value),
                onKeyDown: ({ key: m }) => c(m),
            }),
            Xt.default.createElement(
                VA,
                null,
                r.map((m, v) =>
                    Xt.default.createElement(
                        zx,
                        { key: m },
                        Xt.default.createElement(QA, {
                            src: `https://www.google.com/s2/favicons?sz=64&domain_url=${m}`,
                        }),
                        Xt.default.createElement(ZA, null, m),
                        Xt.default.createElement(YA, {
                            src: n5(),
                            onClick: () => d(v),
                        })
                    )
                )
            )
        )
    );
}
var mD = ["History", "Blocklist", "Allowlist", "About", "FAQ"],
    a5 = mD;
var i5 = WC;
