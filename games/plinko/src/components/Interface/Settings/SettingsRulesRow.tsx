import DOMPurify from 'dompurify'

const SettingsRulesRow = ({ htmlString }) => {
  const sanitizedHTML = DOMPurify.sanitize(htmlString)

  return <div dangerouslySetInnerHTML={{ __html: sanitizedHTML }} />;
};

export default SettingsRulesRow
