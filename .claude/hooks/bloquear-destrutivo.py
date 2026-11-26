#!/usr/bin/env python3
# Hook PreToolUse: barra comandos do Git que apagam trabalho sem volta.
import json, re, sys

comando = json.load(sys.stdin).get("tool_input", {}).get("command", "")

push_forcado = re.search(r"\bgit\b.*\bpush\b.*\s(--force|-f)(\s|$)", comando)
reset_hard = re.search(r"\bgit\b.*\breset\b.*--hard", comando)

if push_forcado or reset_hard:
    print("Bloqueado pelo hook do projeto: push forçado e reset --hard apagam trabalho. "
          "Não tente outro comando que descarte mudanças; explique e pergunte à pessoa.",
          file=sys.stderr)
    sys.exit(2)
